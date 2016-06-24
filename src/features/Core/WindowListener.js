'use strict';

var $ = require('jquery');

module.exports = function () {

	var windowLocationHREF = window.location.href;

	function init() {
		onWindowLocationHrefChange();
	}

	function subscribe(eventName, fn) {
		$.subscribe(eventName, fn);
	}

	function onWindowLocationHrefChange() {
		setInterval(function () {
			if (windowLocationHREF !== window.location.href) {
				windowLocationHREF = window.location.href;
				$.publish('window:location:href:change', true);
			}
		}, 100);
	}

	return {
		init: init,
		subscribe: subscribe
	}

}();
