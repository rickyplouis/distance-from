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
  export type Lat = number
  export type Lng = number
  export type City = [Lat, Lng]
  export type ListOfSupportedStates = string[]
  export type ListOfSupportedCities = string[]
  export type Places = {
    usa: {
      il: {
        naperville: City
        chicago: City
        streamwood: City
      }
      ny: {
        newYorkCity: City
      }
      mo: {
        kansasCity: City
      }
      mi: {
        detroit: City
        troy: City
      }
      ca: {
        losAngeles: City
        sanJose: City
        sanFrancisco: City
      }
    }
  }
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
  private distance: number | undefined

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

    this.distance = this.distanceInKm(
      this.origin[0],
      this.origin[1],
      destination[0],
      destination[1],
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
    if (!this.distance) {
      throw new Error('Need to use a valid distance')
    }

    if (!this.validUnits(units)) {
      throw new Error('Need to use valid units, run distFrom().unitList() to see list')
    }

    const { distance } = this
    if (units === 'mi' || units === 'mile' || units === 'miles') {
      return distance * 0.6213712
    } else if (
      units === 'm' ||
      units === 'meter' ||
      units === 'meters' ||
      units === 'metre'
    )
      return distance * 1000
    else if (units === 'cm' || units === 'centimeter' || units === 'centimeters') {
      return distance * 100000
    } else if (units === 'in' || units === 'inch' || units === 'inches') {
      return distance * 39370.1
    } else if (units === 'ft' || units === 'feet') {
      return distance * 3280.84
    } else if (units === 'yd' || units === 'yard' || units === 'yards') {
      return distance * 1093.61
    } else return distance
  }

  unitList() {
    return unitList.slice()
  }

  places(): distanceFrom.Places {
    return {
      usa: {
        il: {
          naperville: [41.81023757023769, -88.2282830073452],
          chicago: [42.01682819245601, -87.3011661732315],
          streamwood: [42.026002193961084, -88.17517375314642],
        },
        ny: {
          newYorkCity: [40.79500901101372, -74.12456877495657],
        },
        mo: {
          kansasCity: [39.16961900570103, -94.64656902327792],
        },
        mi: {
          detroit: [42.39148243702238, -83.05589747705353],
          troy: [42.57794777862195, -83.16465929309503],
        },
        ca: {
          losAngeles: [34.25460303876844, -118.8961867571036],
          sanJose: [37.38919954624826, -121.88193375335521],
          sanFrancisco: [37.81499641384617, -122.59176494681763],
        },
      },
    }
  }

  listOfSupportedStates(): distanceFrom.ListOfSupportedStates {
    return Object.keys(this.places().usa).sort()
  }

  listOfSupportedCities(): distanceFrom.ListOfSupportedCities {
    const states = this.listOfSupportedStates()
    let cities: string[] = []
    const { usa } = this.places()

    for (const state of states) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const citiesInTheState = Object.keys(usa[state])
      cities = cities.concat(citiesInTheState)
    }

    return cities
  }
}

function distanceFrom(val: distanceFrom.Position) {
  return new DistanceFrom(val)
}

export = distanceFrom
