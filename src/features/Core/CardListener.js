'use strict';


var Utils = require('./Utils');


module.exports = function () {


	var events = Utils.mirrorKeys({
		CARDS_CARD_REMOVED: '',
		CARDS_CARD_ADDED: '',
		CARDS_COUNT_CHANGED: ''
	});


	var totalCards;


	function init() {
		totalCards = getCurrentCardCount();
		requestAnimationFrame(checkForCardCountChanged);
	}


	function checkForCardCountChanged() {
		var currentTotalCardCount = getCurrentCardCount();

		if (totalCards !== currentTotalCardCount) {
			if (totalCards < currentTotalCardCount) {
				Utils.publish(events.CARDS_CARD_ADDED, true);
			} else {
				Utils.publish(events.CARDS_CARD_REMOVED, true);
			}
			Utils.publish(events.CARDS_COUNT_CHANGED, true);

			totalCards = currentTotalCardCount;
		}
		requestAnimationFrame(checkForCardCountChanged);
	}


	function getCurrentCardCount() {
		return Utils.getCards().length;
	}


	return {
		init: init,
		events: events
	}


}();
