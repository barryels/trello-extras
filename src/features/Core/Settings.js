'use strict';


/*
 Allows user to control certain feature settings
 */


var $ = require('jquery');
var packageJSON = require('./../../../package.json');
// var Utils = require('./Utils');


function init() {
	$('#App_version').html(packageJSON.version);
}


function sendEvent(eventName) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {eventName: eventName}, function(response) {
			// alert('greeting!');
		});
	});
}


module.exports = {
	init: init
};
