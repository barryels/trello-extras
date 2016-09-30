'use strict';

var $ = require('jquery');
var Utils = require('./../Core/Utils');

module.exports = function () {

	var windowLocationHREF = window.location.href;
	var events = Utils.mirrorKeys({
		WINDOW_LOAD_COMPLETE: '',
		WINDOW_LOCATION_CHANGE: ''
	});

	function init() {
		listenToWindowLocationHrefChange();

		$(window).bind('load', function () {
			Utils.publish(events.WINDOW_LOAD_COMPLETE, true);
		});
	}

	function listenToWindowLocationHrefChange() {
		requestAnimationFrame(checkForWindowLocationHrefChange);
	}

	function checkForWindowLocationHrefChange() {
		if (windowLocationHREF !== window.location.href) {
			windowLocationHREF = window.location.href;
			onWindowLocationHrefChange();
		}

		requestAnimationFrame(checkForWindowLocationHrefChange);
	}

	function onWindowLocationHrefChange() {
		Utils.publish(events.WINDOW_LOCATION_CHANGE, true);
	}

	return {
		init: init,
		events: events
	}

}();
