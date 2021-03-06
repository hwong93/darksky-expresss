import geoip from 'geoip-lite';
import fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';
dotenv.config()


const darkskyurl = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/`;
const geocoderurl = `https://maps.googleapis.com/maps/api/geocode/json?`;

const getForecastFromZip = (zip, res, sendData) => {
	let geocode = geocoderurl + `address=${zip}&key=${process.env.GEOCODER_KEY}`;
	let location = [];
	let errorMessage = '';
	fetch(geocode)
		.then(response => response.json())
		.then(data => {
			let lat = data.results[0].geometry.location.lat;
			let lng = data.results[0].geometry.location.lng;
			let darksky = darkskyurl + `${lat},${lng}`;
			return fetch(darksky);
		})
		.catch(error => errorMessage = 'Zipcode does not exist.')
		.then(response => response.json())
		.then(data => res.render('index', Object.assign({}, sendData, { title: `Weather at ${zip}`, zip, forecast: data, page: 'forecast'})))
		.catch(error => res.render('index', { title: 'Sorry, we couldn\'t get the forecast. Try again later!', page: 'home', error: errorMessage }));

}

const getForecastCurrentPosition = (ip, res, sendData) => {
	if (!ip) {
		res.render('index', {title: 'Sorry! We couldn\'t find you\'re IP Address!', page: 'home'});
	}
	let geo = geoip.lookup(ip);
	if (geo !== null) {
		let darksky = darkskyurl + `${geo.ll[0]},${geo.ll[1]}`;
		fetch(darksky)
			.then(response => response.json())
			.then(data => res.render('index', Object.assign({}, sendData, { title: 'Weather in Your Location!', forecast: data, page: 'forecast'})))
			.catch(error => res.render('index', {title: 'Sorry! We couldn\'t find your weather. Try again later!', page: 'home' }))
	} else {
		res.render('index', {title: 'Sorry! We couldn\'t find you\'re IP Address!', page: 'home'});
	}
	
}

module.exports = {
	getForecastFromZip,
	getForecastCurrentPosition,
}