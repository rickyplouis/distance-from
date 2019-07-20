import { Result, Failure, Success} from "amonad"

type Position = [number, number]
type Units = 'km' | 'kilometers' | 'm' | 'meters' | 'meter' | 'metre' | 'mi' | 'mile' | 'miles' | 'feet' | 'ft'

const multiply = (multiplier1: number) => (multiplier2: number) => multiplier1 * multiplier2

const unitList: Units[] = ['km', 'kilometers', 'm', 'meters', 'meter', 'metre', 'mi', 'mile', 'miles', 'feet', 'ft']

class DistanceFrom {
  private distance: Result<number, Error> = Failure(new Error("Destination is not configured, run distFrom.to()."))

  constructor( private origin: Position ) { }

  degreeToRadians(degrees: number = 0) {
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

    const radius = 6371
    const φ1 = this.degreeToRadians(lat1)
    const λ1 = this.degreeToRadians(lon1)
    const φ2 = this.degreeToRadians(lat2)
    const λ2 = this.degreeToRadians(lon2)
    const Δφ = φ2 - φ1
    const Δλ = λ2 - λ1

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = radius * c

    return d
  }

  to( destination: Position) {
    if (!Array.isArray(this.origin)) {
      throw new Error('Must use array of [lat, lng] for origin')
    }

    if (!Array.isArray(destination)) {
      throw new Error('Must use array of [lat, lng] for destination')
    }

    this.distance = Success(
      this.distanceInKm(
        this.origin[0],
        this.origin[1],
        destination[0],
        destination[1]
      )
    )

    return this
  }

  validUnits(unit: Units) {
    if (unit) {
      if (typeof unit !== 'string') {
        throw new Error('Unit must be type of string')
      }

      return this.unitList().indexOf(unit) >= 0
    }

    throw new Error('Must input a unit to determine if valid')
  }

  in( units: Units ) {
    return this.distance
      .bind( distance =>
        this.validUnits(units) ?
          Success<number, Error>(distance)
          :
          Failure<number, Error>(new Error('Need to use valid units, run distFrom.unitList() to see list'))
      )
      .bind( distance => {
        if (units === 'mi' || units === 'mile' || units === 'miles')
          return distance * 0.6213712
        else if (units === 'm' || units === 'meter' || units === 'meters' || units === 'metre')
          return distance * 1000
        else if (units === 'ft' || units === 'feet')
          return distance * 3280.84
        else
          return distance
      })
      .getOrThrow()
  }

  unitList() {
    return unitList.slice()
  }
}

module.exports = function (val) {
  return new DistanceFrom(val)
}

