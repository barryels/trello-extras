'use strict';

var $ = require('jquery');


var events = {
	KEY_UP_ANY: 'keyboard:key:up',
	KEY_UP_VARIABLE: 'keyboard:key:up:',
	KEY_UP_ENTER: 'keyboard:key:up:enter'
};


module.exports = function () {

	function init() {
		$(document).bind('keyup', function (e) {
			switch (e.keyCode) {
				case 13:
					$.publish(events.KEY_UP_ENTER, true);
					break;
				default:
					$.publish(events.KEY_UP_ANY, true);
					$.publish(events.KEY_UP_VARIABLE + e.keyCode, true);
			}
		});
	}

	function subscribe(eventName, fn) {
		$.subscribe(eventName, fn);
	}

	return {
		init: init,
		events: events,
		subscribe: subscribe
	};

}();
