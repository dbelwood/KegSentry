var sys = require('util');
var rest = require('restler');
var __ENDPOINT__ = 'https://shielded-gorge-2278.herokuapp.com';

var record = function(barId, kegId) {
	this.endpoint = __ENDPOINT__;
	this.barId = barId;
	this.kegId = kegId;
	this.addTemperature.bind(this);
	this.addPour.bind(this);
}
record.prototype = {
	initialize: function() {

	},
	addTemperature: function(temperature, dateTime) {
		rest.post(this.endpoint+'/temperatures', {data:{
			"temperature" : parseInt(temperature), 
			"barId": this.barId, 
			"kegId": this.kegId, 
			"dateTime": dateTime.toJSON()
		}}).on('success', function(data, response) {
			console.log("Temperature insert successful.");
		}).on('error', function(err, response) {
			console.log("Temperature ERROR: " + err);
		});
	},
	addPour: function(temperature, duration, dateTime) {
		rest.post(this.endpoint+'/pours', {data:{
			"temperature" : parseInt(temperature),
			"barId": this.barId, 
			"kegId": this.kegId, 
			"dateTime": dateTime.toJSON(),
			"duration": parseInt(duration)
		}}).on('success', function(data, response) {
			console.log("Pour insert successful.");
		}).on('error', function(err, response) {
			console.log("Pour ERROR: " + err);
		});
	}
}
module.exports = record;