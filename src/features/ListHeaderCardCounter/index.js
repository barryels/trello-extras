'use strict';

/*
 Allows toggling the visibility of card cover images
 */


var name = 'ListHeaderCardCounter';
var $ = require('jquery');
var Utils = require('./../Core/Utils');
var Core = require('./../Core/index');
var WindowListener = require('./../Listeners/WindowListener');
var KeyboardListener = require('./../Listeners/KeyboardListener');
var StyleManager = require('./../Core/StyleManager');


var events = Utils.mirrorKeys({

});


var style = {};

style['.list-header'] = {
	' .be-ListHeaderCardCounter': {
		margin: '3px 0 0 0'
	}
};


function init() {
	StyleManager.addComponentStyle(name, style);

	update();
	Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
	Utils.subscribe(Core.events.CORE_LIST_CARDS_FILTERED, update);
}


function update() {
	updateListsHeaderCardCounter();
}


function updateListsHeaderCardCounter() {
	Utils.getLists().each(function () {
		updateListHeaderNumCards($(this));
	});
}


function getListHeaderCardCounter(list) {
	if (list) {
		return list.find('.list-header').find('.be-ListHeaderCardCounter');
	}
	return null;
}


function updateListHeaderNumCards(list, found) {
	var listHeaderNumCards = getListHeaderCardCounter(list),
		total = Utils.getListCardsTotal(list);

	if (listHeaderNumCards.length === 0) {
		list.find('.list-header').append('<p class="be-ListHeaderCardCounter"></p>');
	}

	listHeaderNumCards = getListHeaderCardCounter(list);

	if (listHeaderNumCards) {
		listHeaderNumCards.attr('data-total', total);

		if (found === undefined || found === total) {
			listHeaderNumCards.html('<i class="icon-sm icon-card"></i> ' + total);
		} else {
			listHeaderNumCards.html('<i class="icon-sm icon-card"></i> ' + found + ' / ' + total);
		}

		return true;
	}

	return false;
}




module.exports = {
	init: init,
	events: events
};
