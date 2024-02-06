// List of popular hardcoded places with their coordinates
// Coordinates come from google maps which are measured using the Mercator projector's origin
// More info here: https://developers.google.com/maps/documentation/javascript/coordinates#:~:text=World%20coordinates%20in%20Google%20Maps,towards%20the%20south%20(down).

// If a place is missing that you'd like to add feel free to open a PR
export type Lat = number
export type Lng = number
export type City = [Lat, Lng]

export type UnitedStates = {
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

export const usa: UnitedStates = {
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
}

export function listOfSupportedStates(): string[] {
  return Object.keys(usa).sort()
}

export function listOfSupportedCities(): string[] {
  const states = listOfSupportedStates()
  let cities: string[] = []

  for (const state of states) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const citiesInTheState = Object.keys(usa[state])
    cities = cities.concat(citiesInTheState)
  }

  return cities
}
