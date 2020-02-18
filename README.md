## distance-from [![Build Status](https://travis-ci.com/rickyplouis/distance-from.svg?branch=master)](https://travis-ci.com/rickyplouis/distance-from) [![Coverage Status](https://coveralls.io/repos/github/rickyplouis/distance-from/badge.svg?branch=master)](https://coveralls.io/github/rickyplouis/distance-from?branch=master) [![npm version](https://badge.fury.io/js/distance-from.svg)](https://badge.fury.io/js/distance-from)

# distance-from

Simple API for quickly calculating distance between two coordinates

### Installation
```js
$ npm i distance-from
```
### Example
```js
// Use format of [lat, lng]
const chicago = [41.977226, -87.836723];
const ny = [40.730610, -73.935242];

const distFrom = require('distance-from');

// defaults to kilometers if no units put in
distFrom(chicago).to(ny).in('mi');
// returns distance using haversine formula with margin of error +/- 0.03%
```


#### Supported units
* km || kilometer || kilometers
* m || meter || meters
* cm || centimeter || centimeters
* mi || mile || miles
* ft || feet
* in || inch || inches
* yd || yard || yards

### License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
