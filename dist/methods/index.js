"use strict";

var _geoipLite = _interopRequireDefault(require("geoip-lite"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var darkskyurl = "https://api.darksky.net/forecast/".concat(process.env.DARKSKY_KEY, "/");
var geocoderurl = "https://maps.googleapis.com/maps/api/geocode/json?";

var getForecastFromZip = function getForecastFromZip(zip, res, sendData) {
  var geocode = geocoderurl + "address=".concat(zip, "&key=").concat(process.env.GEOCODER_KEY);
  var location = [];
  var errorMessage = '';
  (0, _isomorphicFetch["default"])(geocode).then(function (response) {
    return response.json();
  }).then(function (data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var darksky = darkskyurl + "".concat(lat, ",").concat(lng);
    return (0, _isomorphicFetch["default"])(darksky);
  })["catch"](function (error) {
    return errorMessage = 'Zipcode does not exist.';
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return res.render('index', Object.assign({}, sendData, {
      title: "Weather at ".concat(zip),
      zip: zip,
      forecast: data,
      page: 'forecast'
    }));
  })["catch"](function (error) {
    return res.render('index', {
      title: 'Sorry, we couldn\'t get the forecast. Try again later!',
      page: 'home',
      error: errorMessage
    });
  });
};

var getForecastCurrentPosition = function getForecastCurrentPosition(ip, res, sendData) {
  if (!ip) {
    res.render('index', {
      title: 'Sorry! We couldn\'t find you\'re IP Address!',
      page: 'home'
    });
  }

  var geo = _geoipLite["default"].lookup(ip);

  if (geo !== null) {
    var darksky = darkskyurl + "".concat(geo.ll[0], ",").concat(geo.ll[1]);
    (0, _isomorphicFetch["default"])(darksky).then(function (response) {
      return response.json();
    }).then(function (data) {
      return res.render('index', Object.assign({}, sendData, {
        title: 'Weather in Your Location!',
        forecast: data,
        page: 'forecast'
      }));
    })["catch"](function (error) {
      return res.render('index', {
        title: 'Sorry! We couldn\'t find your weather. Try again later!',
        page: 'home'
      });
    });
  } else {
    res.render('index', {
      title: 'Sorry! We couldn\'t find you\'re IP Address!',
      page: 'home'
    });
  }
};

module.exports = {
  getForecastFromZip: getForecastFromZip,
  getForecastCurrentPosition: getForecastCurrentPosition
};