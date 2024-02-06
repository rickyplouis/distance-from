import type { Result } from 'amonad'
import { Failure, Success } from 'amonad'

// The following namespace is required to use declaration merging to be able to export
// the types.
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace distanceFrom {
  export type Position = [number, number]
  export type Units =
    | 'km'
    | 'kilometer'
    | 'kilometers'
    | 'm'
    | 'meters'
    | 'meter'
    | 'metre'
    | 'cm'
    | 'centimeter'
    | 'centimeters'
    | 'mi'
    | 'mile'
    | 'miles'
    | 'feet'
    | 'ft'
    | 'in'
    | 'inch'
    | 'inches'
    | 'yd'
    | 'yard'
    | 'yards'
  export type DistanceFrom = Distance
}

const unitList: distanceFrom.Units[] = [
  'km',
  'kilometers',
  'kilometers',
  'm',
  'meters',
  'meter',
  'metre',
  'cm',
  'centimeter',
  'centimeters',
  'mi',
  'mile',
  'miles',
  'feet',
  'ft',
  'in',
  'inch',
  'inches',
  'yd',
  'yard',
  'yards',
]

// The following is needed to have an alias name to be able to export the DistanceFrom
// interface from the namespace with the same name.
type Distance = DistanceFrom

class DistanceFrom {
  private distance: Result<number, Error> = Failure(
    new Error('Destination is not configured, run distFrom.to().')
  )

  constructor(private readonly origin: distanceFrom.Position) {}

  degreeToRadians(degrees = 0) {
    // Math.PI / 180
    if (isNaN(degrees)) {
      throw new Error('Must input valid number for degrees')
    }

    return degrees * 0.017453292519943295
  }

  // This implementation originally appeared at http://www.movable-type.co.uk/scripts/latlong.html
  // Courtesy of @chrisveness
  distanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    // A = sin²(Δφ/2) + cos(φ1)⋅cos(φ2)⋅sin²(Δλ/2)
    // δ = 2·atan2(√(a), √(1−a))
    // see mathforum.org/library/drmath/view/51879.html for derivation

    const sine = (num: number) => Math.sin(num / 2)
    const cos = (num: number) => Math.cos(num)

    const radius = 6371
    /* eslint-disable @typescript-eslint/naming-convention */
    const φ1 = this.degreeToRadians(lat1)
    const λ1 = this.degreeToRadians(lon1)
    const φ2 = this.degreeToRadians(lat2)
    const λ2 = this.degreeToRadians(lon2)
    const Δφ = φ2 - φ1
    const Δλ = λ2 - λ1
    /* eslint-enable @typescript-eslint/naming-convention */

    const a = sine(Δφ) * sine(Δφ) + cos(φ1) * cos(φ2) * Math.pow(sine(Δλ), 2)
    return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * radius
  }

  to(destination: distanceFrom.Position) {
    if (!Array.isArray(this.origin)) {
      throw new Error('Must use array of [lat, lng] for origin')
    }

    if (!Array.isArray(destination)) {
      throw new Error('Must use array of [lat, lng] for destination')
    }

    this.distance = Success(
      this.distanceInKm(this.origin[0], this.origin[1], destination[0], destination[1])
    )

    return this
  }

  validUnits(unit: distanceFrom.Units) {
    if (unit) {
      if (typeof unit !== 'string') {
        throw new Error('Unit must be type of string')
      }

      return this.unitList().includes(unit)
    }

    throw new Error('Must input a unit to determine if valid')
  }

  in(units: distanceFrom.Units) {
    return this.distance
      .bind((distance) =>
        this.validUnits(units)
          ? Success<number, Error>(distance)
          : Failure<number, Error>(
              new Error('Need to use valid units, run distFrom.unitList() to see list')
            )
      )
      .bind((distance) => {
        if (units === 'mi' || units === 'mile' || units === 'miles')
          return distance * 0.6213712
        else if (
          units === 'm' ||
          units === 'meter' ||
          units === 'meters' ||
          units === 'metre'
        )
          return distance * 1000
        else if (units === 'cm' || units === 'centimeter' || units === 'centimeters')
          return distance * 100000
        else if (units === 'in' || units === 'inch' || units === 'inches')
          return distance * 39370.1
        else if (units === 'ft' || units === 'feet') return distance * 3280.84
        else if (units === 'yd' || units === 'yard' || units === 'yards')
          return distance * 1093.61
        else return distance
      })
      .getOrThrow()
  }

  unitList() {
    return unitList.slice()
  }
}

function distanceFrom(val: distanceFrom.Position) {
  return new DistanceFrom(val)
}

export = distanceFrom
