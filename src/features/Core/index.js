'use strict';


var name = 'Core';
var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var KeyboardListener = require('./../Listeners/KeyboardListener');
var StyleManager = require('./../Core/StyleManager');


var events = Utils.mirrorKeys({
	CORE_LIST_CARDS_FILTERED: ''
});


var style = {};

style['.list-header'] = {
	' .be-ListHeaderCardCounter': {
		margin: '3px 0 0 0'
	}
};


function init() {
	update();

	Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
	Utils.subscribe(WindowListener.events.WINDOW_LOAD_COMPLETE, update);
}


function update() {
	addListHeaderContainer();
}


function addListHeaderContainer() {
	Utils.getLists().each(function () {
		var list = $(this),
			listHeader = list.find('.list-header'),
			listHeaderContainer = listHeader.find('.be-core-list-header-container');

		if (listHeaderContainer.length === 0) {
			listHeader.append('<div class="be-core-list-header-container"></div>');
		}
	});
}


module.exports = {
	init: init,
	events: events
};
