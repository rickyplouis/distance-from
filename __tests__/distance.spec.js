const distFrom = require('../lib/index');

const ny = [40.71278, -74.00594];
const london = [51.50853, -0.12574];

test('gets distance from ny to london in kilometers', () => {
  expect(
    parseInt(
      distFrom(ny)
        .to(london)
        .in('km'),
      10
    )
  ).toBe(5570);
});

test('gets distance from ny to london in meters', () => {
  expect(
    parseInt(
      distFrom(ny)
        .to(london)
        .in('m'),
      10
    )
  ).toBe(5570315);
});

test('gets distance from ny to london in miles', () => {
  expect(
    parseInt(
      distFrom(ny)
        .to(london)
        .in('mi'),
      10
    )
  ).toBe(3461);
});

test('test invalid units', () => {
  expect(() => {
    distFrom(ny)
      .to(london)
      .in('steps');
  }).toThrow();
});

test('test bad origin', () => {
  expect(() => {
    distFrom().to(london);
  }).toThrow();
});

test('degree to radians with no input', () => {
  expect(distFrom().degreeToRadians()).toEqual(0);
});

test('degree to radians with standard input', () => {
  expect(parseInt(distFrom().degreeToRadians(100), 10)).toEqual(1);
});
