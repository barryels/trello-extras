'use strict';

/*
 Highlights the last modified card
 */


var name = 'HighlightLastModifiedCard';
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var StyleManager = require('./../Core/StyleManager');
var $ = require('jquery');


var style = {};

style['.' + name] = {
	background: '#ffc66d !important'
};

var activeCardID = null;


function init() {
	Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, onWindowLocationChange);

	StyleManager.addComponentStyle(name, style);
}


function onWindowLocationChange(e, data) {
	Utils.getCards().removeClass(name);

	activeCardID = Utils.getCardIDFromCardURL(data.from);

	if (activeCardID) {

		Utils.getCardTitles().each(function (index, cardTitle) {
			if (activeCardID === Utils.getCardIDFromCardURL($(this).attr('href'))) {
				$(this).closest('.list-card').addClass(name);
			}
		});
	}
}


module.exports = {
	init: init
};
