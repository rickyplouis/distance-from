const distFrom = require('../lib/index');

test('gets list of units', () => {
  expect(Array.isArray(distFrom().unitList())).toBe(true);
});
