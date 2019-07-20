const distFrom = require('../dist/index')

const ny = [40.71278, -74.00594]
const london = [51.50853, -0.12574]

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
    expect( () => { 
      distFrom(ny).in('miles')
    }).toThrow()
  })
})

describe('distFrom().from().to().in()', () => {
  test('gets distance from ny to london in kilometers', () => {
    expect(
      parseInt(
        distFrom(ny)
          .to(london)
          .in('km'),
        10
      )
    ).toBe(5570)
  })

  test('gets distance from ny to london in miles', () => {
    expect(
      parseInt(
        distFrom(ny)
          .to(london)
          .in('miles'),
        10
      )
    ).toBe(3461)
  })

  test('gets distance from ny to london in feet', () => {
    expect(
      parseInt(
        distFrom(ny)
          .to(london)
          .in('ft'),
        10
      )
    ).toBe(18275313)
  })

  test('test invalid units', () => {
    expect(() => {
      distFrom(ny)
        .to(london)
        .in('steps')
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
