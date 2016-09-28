'use strict';

var $ = require('jquery');

module.exports = function () {

	var windowLocationHREF = window.location.href;

	function init() {
		listenToWindowLocationHrefChange();
	}

	function subscribe(eventName, fn) {
		$.subscribe(eventName, fn);
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
		$.publish('window:location:href:change', true);
	}

	return {
		init: init,
		subscribe: subscribe
	}

}();
