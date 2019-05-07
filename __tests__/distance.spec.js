const distFrom = require('../lib/index');

test('gets distance from ny to london in kilometers', () => {
  const ny = [40.71278, -74.00594];
  const london = [51.50853, -0.12574];
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
  const ny = [40.71278, -74.00594];
  const london = [51.50853, -0.12574];
  expect(
    parseInt(
      distFrom(ny)
        .to(london)
        .in('m'),
      10
    )
  ).toBe(5570315);
});
