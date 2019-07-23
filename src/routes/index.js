import express from 'express';
import Methods from '../methods/index';
import { check, validationResult } from 'express-validator';

var router = express.Router();


/* GET home page. */
router.get('/', [	check('zip').isLength({min: 5, max: 5})], async (req, res, next) => {
	const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('index', {title: 'Dark Skeet', zip: req.query.zip, error: 'ZIP MUST BE 5 CHARS LONG'})
	}
	
	if (req.query.zip !== undefined) {
		Methods.getForecastFromZip(req.query.zip, res);
	} else {
		res.render('index', { title: 'Dark Skeet', zip: req.query.zip });
	}
	console.log(req.query.zip);
});

export default router;
