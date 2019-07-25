import express from 'express';
import Methods from '../methods/index';
import { check, validationResult, param } from 'express-validator';

const router = express.Router();

let data = {
	title: "Welcome to Dark Sky Express",
	page: "home",
}

/* GET home page. */
router.get('/',(req, res, next) => {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	data.fullUrl = fullUrl;
	res.render('index', data);
});

router.get('/weather', [check('zip').isLength({min: 5, max: 5})], (req, res, next) => {
	const errors = validationResult(req);
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	data.fullUrl = fullUrl;

  if (!errors.isEmpty()) {
    return res.render('index', Object.assign({}, data, {
			zip: req.query.zip !== '/' ? req.query.zip : '',
			error: 'ZIP MUST BE 5 CHARS LONG',
		}))
	}
	
	res.redirect(`/weather/${req.query.zip}`);
});


router.get('/weather/:zip', [param('zip').isLength({min: 5, max: 5})], (req, res, next) => {
	const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('index', Object.assign({}, data, {
			zip: req.params.zip,
			error: 'ZIP MUST BE 5 CHARS LONG',
		}))
	}
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	data.fullUrl = fullUrl;
	Methods.getForecastFromZip(req.params.zip, res, data);

});

router.get('/my-weather', (req, res, next) => {
	var ip = req.ip
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	data.fullUrl = fullUrl;
	Methods.getForecastCurrentPosition(ip,res, data);
});

export default router;
