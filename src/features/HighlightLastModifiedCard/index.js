'use strict';

/*
 Highlights the last modified card
 */


var name = 'HighlightLastModifiedCard';
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var StyleManager = require('./../Core/StyleManager');


var style = {};

style['.' + name] = {
	background: '#ffc66d !important'
};

var activeCardHref = null;
var activeCardDOMElement = null;


function init() {
	Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, onWindowLocationChange);

	StyleManager.addComponentStyle(name, style);
}


function onWindowLocationChange(e, data) {
	console.log('onWindowLocationChange()', data);
	if (data.from.indexOf('/c/') > -1) {
		activeCardHref = data.from.split('https://trello.com').join('');

		Utils.getCards().removeClass(name);
		Utils.findDOMElement('.list-card-title[href="' + activeCardHref + '"]').closest('.list-card').addClass(name);
	}

	console.log(activeCardHref, activeCardDOMElement);
}


module.exports = {
	init: init
};
