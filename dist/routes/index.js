"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("../methods/index"));

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
})],
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var errors, fullUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.render('index', Object.assign({}, data, {
              zip: req.params.zip,
              error: 'ZIP MUST BE 5 CHARS LONG'
            })));

          case 3:
            fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            data.fullUrl = fullUrl;

            _index["default"].getForecastFromZip(req.params.zip, res, data);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/my-weather', function (req, res, next) {
  var ip = req.ip;
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  data.fullUrl = fullUrl;

  _index["default"].getForecastCurrentPosition(ip, res, data);
});
var _default = router;
exports["default"] = _default;