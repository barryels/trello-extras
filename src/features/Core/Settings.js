'use strict';

/*
 Allows user to control certain feature settings
 */


var $ = require('jquery');
var packageJSON = require('./../../../package.json');
// var Utils = require('./Utils');
var HideCardCover = require('./../HideCardCover/index');


function init() {
	
	$('#App_version').html(packageJSON.version);
	
	
	$('#HideCardCover_toggle').change(function () {
		if (this.checked) {
			sendEvent(HideCardCover.events.HideCardCover_hide_images);
			// Utils.publish(HideCardCover.events.HideCardCover_hide_images);
		} else {
			// alert('not-checked');
			sendEvent(HideCardCover.events.HideCardCover_show_images);
			// Utils.publish(HideCardCover.events.HideCardCover_show_images);
		}
	});
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
