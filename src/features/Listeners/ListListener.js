'use strict';


var Utils = require('./../Core/Utils');


module.exports = function () {


	var events = Utils.mirrorKeys({
		LISTS_LIST_REMOVED: '',
		LISTS_LIST_ADDED: '',
		LISTS_COUNT_CHANGED: ''
	});


	var totalLists;


	function init() {
		totalLists = getCurrentListCount();
		requestAnimationFrame(checkForListCountChanged);
	}


	function checkForListCountChanged() {
		var currentTotalListCount = getCurrentListCount();

		if (totalLists !== currentTotalListCount) {
			if (totalLists < currentTotalListCount) {
				Utils.publish(events.LISTS_LIST_ADDED, true);
			} else {
				Utils.publish(events.LISTS_LIST_REMOVED, true);
			}
			Utils.publish(events.LISTS_COUNT_CHANGED, true);

			totalLists = currentTotalListCount;
		}
		requestAnimationFrame(checkForListCountChanged);
	}


	function getCurrentListCount() {
		return Utils.getLists().length;
	}


	return {
		init: init,
		events: events
	}


}();
