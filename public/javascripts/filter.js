document.getElementById('weekly-filter').addEventListener('click', function(ev) {
	ev.preventDefault();
	toggleClass();
	this.classList.add('show');
	document.getElementById('weekly').classList.add('show');
});

document.getElementById('hourly-filter').addEventListener('click', function(ev) {
	ev.preventDefault();
	toggleClass();
	this.classList.add('show');
	document.getElementById('hourly').classList.add('show');
});

document.getElementById('currently-filter').addEventListener('click', function(ev) {
	ev.preventDefault();
	toggleClass();
	this.classList.add('show');
	document.getElementById('currently').classList.add('show');
});

function toggleClass() {
	var forecasts = document.querySelectorAll('.show');

	[].forEach.call(forecasts, function(el) {
    el.classList.remove("show");
	});

}