'use strict';


var $ = require('jquery');


var events = {
	MOUSE_UP: 'mouse:up',
	MOUSE_DOWN: 'mouse:down'
};


module.exports = function () {

	function init() {
		$(document).bind('mousedown', function (e) {
			console.log(events.MOUSE_DOWN);
			$.publish(events.MOUSE_DOWN, true);
		});
		$(document).bind('mouseup', function (e) {
			console.log(events.MOUSE_UP);
			$.publish(events.MOUSE_UP, true);
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
