const distFrom = require('../dist/index')
const Places = require('../dist/Places')

const ny = [40.79500901101372, -74.12456877495657]
const chitown = Places.usa.il.chicago
const london = [51.53269844455333, -0.07741875190006414]

describe('distFrom().from().to()', () => {
  test('throws for no origin', () => {
    expect(() => {
      distFrom().to(london)
    }).toThrow()
  })

  test('throws for no destination', () => {
    expect(() => {
      distFrom(ny).to()
    }).toThrow()
  })

  test('throws for bad origin', () => {
    expect(() => {
      distFrom('my house').to(london)
    }).toThrow()
  })

  test('throws for bad destination', () => {
    expect(() => {
      distFrom(ny).to('my house')
    }).toThrow()
  })
})

describe('distFrom().in()', () => {
  test('gets distance without destination in miles', () => {
    expect(() => {
      distFrom(ny).in('miles')
    }).toThrow()
  })
})

describe('distFrom().from().to().in()', () => {
  test('gets distance from ny to london in kilometers', () => {
    expect(parseInt(distFrom(ny).to(london).in('km'), 10)).toBe(5574)
  })

  test('gets distance from ny to london in meters', () => {
    expect(parseInt(distFrom(ny).to(london).in('m'), 10)).toBe(5574697)
  })

  test('gets distance from ny to london in centimeters', () => {
    expect(parseInt(distFrom(ny).to(london).in('cm'), 10)).toBe(557469709)
  })

  test('gets distance from ny to london in miles', () => {
    expect(parseInt(distFrom(ny).to(london).in('miles'), 10)).toBe(3463)
  })

  test('gets distance from ny to london in yards', () => {
    expect(parseInt(distFrom(ny).to(london).in('yards'), 10)).toBe(6096544)
  })

  test('gets distance from ny to london in kilometers', () => {
    expect(parseInt(distFrom(ny).to(london).in('inches'), 10)).toBe(219476381)
  })

  test('gets distance from ny to london in feet', () => {
    expect(parseInt(distFrom(ny).to(london).in('ft'), 10)).toBe(18289689)
  })

  test('gets distance from ny to london in two twice', () => {
    const dist = distFrom(ny).to(london)
    expect(parseInt(dist.in('m'), 10)).toBe(5574697)
    expect(parseInt(dist.in('m'), 10)).toBe(5574697)
  })

  test('gets distance from chicago to ny in km using hardcoded places', () => {
    expect(parseInt(distFrom(chitown).to(ny).in('km'), 10)).toBe(1106)
  })

  test('test invalid units', () => {
    expect(() => {
      distFrom(ny).to(london).in('steps')
    }).toThrow()
  })
})

describe('distFrom().validUnits()', () => {
  test('throws with non string input', () => {
    expect(() => {
      distFrom().validUnits(true)
    }).toThrow()
  })

  test('throws with no input', () => {
    expect(() => {
      distFrom().validUnits()
    }).toThrow()
  })

  test('returns feet as valid unit', () => {
    expect(distFrom().validUnits('feet')).toBeTruthy()
  })

  test('returns steps as invalid unit', () => {
    expect(distFrom().validUnits('steps')).toBeFalsy()
  })
})

describe('places.usa...', () => {
  test('expect chicago to exist', () => {
    expect(() => chitown).toBeTruthy()
  })
  test('get list of supported states and expect them to match the hardcoded list', () => {
    expect(Places.listOfSupportedStates()).toEqual(['il', 'ny', 'ca', 'mo', 'mi'].sort())
  })
  test('get list of supported cities and expect them to exist', () => {
    expect(Places.listOfSupportedCities()).toBeTruthy()
  })
})

describe('distFrom().degreeToRadians', () => {
  test('degree to radians with no input', () => {
    expect(() => {
      distFrom().degreeToRadians('six')
    }).toThrow()
  })

  test('degree to radians with no input', () => {
    expect(distFrom().degreeToRadians()).toEqual(0)
  })

  test('degree to radians with standard input', () => {
    expect(parseInt(distFrom().degreeToRadians(100), 10)).toEqual(1)
  })
})

describe('distFrom().unitList()', () => {
  test('gets list of units', () => {
    expect(Array.isArray(distFrom().unitList())).toBe(true)
  })
})
