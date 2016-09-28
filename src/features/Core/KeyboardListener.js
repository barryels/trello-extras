'use strict';

var $ = require('jquery');

module.exports = function () {

	function init() {
		$(document).bind('keyup', function (e) {
			switch (e.keyCode) {
				case 13:
					$.publish('keyboard:key:up:enter', true);
					break;
				default:
					$.publish('keyboard:key:up:' + e.keyCode, true);
			}
		});
	}

	function subscribe(eventName, fn) {
		$.subscribe(eventName, fn);
	}

	return {
		init: init,
		subscribe: subscribe
	}

}();
