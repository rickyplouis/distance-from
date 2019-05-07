let DistanceFrom;
let distFrom;

DistanceFrom = function(origin) {
  this.origin = origin;
};

DistanceFrom.prototype.degreeToRadians = function(degrees) {
  // Math.PI / 180
  return degrees * 0.017453292519943295;
};

// This implementation originally appeared at http://www.movable-type.co.uk/scripts/latlong.html
// Courtesy of @chrisveness
DistanceFrom.prototype.distanceInKm = function(lat1, lon1, lat2, lon2) {
  // A = sin²(Δφ/2) + cos(φ1)⋅cos(φ2)⋅sin²(Δλ/2)
  // δ = 2·atan2(√(a), √(1−a))
  // see mathforum.org/library/drmath/view/51879.html for derivation

  const radius = 6371;
  const φ1 = this.degreeToRadians(lat1);
  const λ1 = this.degreeToRadians(lon1);
  const φ2 = this.degreeToRadians(lat2);
  const λ2 = this.degreeToRadians(lon2);
  const Δφ = φ2 - φ1;
  const Δλ = λ2 - λ1;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = radius * c;

  return d;
};

DistanceFrom.prototype.to = function(destination) {
  if (!this.origin) {
    throw new Error('Must input proper origin distFrom(origin)');
  }

  if (!Array.isArray(destination)) {
    throw new Error('Must use array of [lat, lng]');
  }

  if (destination && Array.isArray(destination)) {
    this.destination = destination;
  }

  this.distance = this.distanceInKm(
    this.origin[0],
    this.origin[1],
    this.destination[0],
    this.destination[1]
  );
  return this;
};

DistanceFrom.prototype.validUnits = function(unit) {
  if (unit && typeof unit === 'string') {
    return this.unitList().indexOf(unit) >= 0;
  }
};

DistanceFrom.prototype.in = function(units = 'km') {
  if (!this.validUnits(units) || typeof units !== 'string') {
    throw new Error('Need to use valid units, run distFrom.unitList() to see list');
  }

  if (units === 'mi' || units === 'mile' || units === 'miles') {
    this.distance = this.distance * 0.6213712;
  }

  if (units === 'm' || units === 'meter' || units === 'meters' || units === 'metre') {
    this.distance = this.distance * 1000;
  }

  return this.distance;
};

DistanceFrom.prototype.unitList = function() {
  return ['km', 'kilometers', 'm', 'meters', 'mi', 'miles'];
};

distFrom = function(val) {
  return new DistanceFrom(val);
};

module.exports = distFrom;
