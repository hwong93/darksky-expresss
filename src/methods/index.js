import fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';
dotenv.config()

var darkskyurl = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/`;
var geocoderurl = `https://maps.googleapis.com/maps/api/geocode/json?`;

const getForecastFromZip = (zip, res) => {
	let geocode = geocoderurl + `address=${zip}&key=${process.env.GEOCODER_KEY}`;
	let location = [];
	fetch(geocode)
		.then(response => response.json())
		.then(data => {
			var lat = data.results[0].geometry.location.lat;
			var lng = data.results[0].geometry.location.lng;
			var darksky = darkskyurl + `${lat},${lng}`;
			return fetch(darksky);
		})
		.then(response => response.json())
		.then(data => res.render('index', { title: 'Dark Skeet', zip, forecast: data.daily}))
		.catch(error => console.log(error));
}

module.exports = {
	getForecastFromZip,
}