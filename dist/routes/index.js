"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("../methods/index"));

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var data = {
  title: "Welcome to Dark Sky Express",
  page: "home"
  /* GET home page. */

};
router.get('/', function (req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  data.fullUrl = fullUrl;
  res.render('index', data);
});
router.get('/weather', [(0, _expressValidator.check)('zip').isLength({
  min: 5,
  max: 5
})], function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  data.fullUrl = fullUrl;

  if (!errors.isEmpty()) {
    return res.render('index', Object.assign({}, data, {
      zip: req.query.zip !== '/' ? req.query.zip : '',
      error: 'ZIP MUST BE 5 CHARS LONG'
    }));
  }

  res.redirect("/weather/".concat(req.query.zip));
});
router.get('/weather/:zip', [(0, _expressValidator.param)('zip').isLength({
  min: 5,
  max: 5
})], function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.render('index', Object.assign({}, data, {
      zip: req.params.zip,
      error: 'ZIP MUST BE 5 CHARS LONG'
    }));
  }

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  data.fullUrl = fullUrl;

  _index["default"].getForecastFromZip(req.params.zip, res, data);
});
router.get('/my-weather', function (req, res, next) {
  var ip = req.ip;
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  data.fullUrl = fullUrl;

  _index["default"].getForecastCurrentPosition(ip, res, data);
});
var _default = router;
exports["default"] = _default;