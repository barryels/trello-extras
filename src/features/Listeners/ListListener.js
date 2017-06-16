'use strict';


var $ = require('jquery');
var Utils = require('./../Core/Utils');


module.exports = function () {


	var events = Utils.mirrorKeys({
		LISTS_LIST_REMOVED: '',
		LISTS_LIST_ADDED: '',
		LISTS_COUNT_CHANGED: '',
		LISTS_CARD_COUNT_CHANGED: ''
	});


	var totalLists;
	var listCardCounts = [];


	function init() {
		totalLists = getCurrentListCount();
		requestAnimationFrame(update);
	}


	function update() {
		var currentTotalListCount = getCurrentListCount();
		var currentListTotalCardCount = 0;

		if (totalLists !== currentTotalListCount) {
			if (totalLists < currentTotalListCount) {
				Utils.publish(events.LISTS_LIST_ADDED, true);
			} else {
				Utils.publish(events.LISTS_LIST_REMOVED, true);
			}
			Utils.publish(events.LISTS_COUNT_CHANGED, true);

			totalLists = currentTotalListCount;
		}


		Utils.getLists().each(function (i) {
			// console.log($(this));
			currentListTotalCardCount = Utils.getListCardsTotal($(this));

			if (currentListTotalCardCount !== listCardCounts[i]) {
				Utils.publish(events.LISTS_CARD_COUNT_CHANGED, true);
			}

			listCardCounts[i] = currentListTotalCardCount;
		});



		// Utils.getLists()
		// LISTS_CARD_COUNT_CHANGED

		requestAnimationFrame(update);
	}


	function getCurrentListCount() {
		return Utils.getLists().length;
	}


	return {
		init: init,
		events: events
	}


}();
