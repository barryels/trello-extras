'use strict';

/*
 Allows toggling the visibility of card cover images
 */


var name = 'HideCardCover';
var Utils = require('./../Core/Utils');
var StyleManager = require('./../Core/StyleManager');


var events = Utils.mirrorKeys({
	HideCardCover_hide_images: '',
	HideCardCover_show_images: ''
});


var style = {};

style['.list-card-cover'] = {};


function init() {
	hideImages();

	Utils.subscribe(events.HideCardCover_hide_images, hideImages);
	Utils.subscribe(events.HideCardCover_show_images, showImages);
}


function hideImages() {
	// console.log('hideImages()');
	style['.list-card-cover'].display = 'none';
	StyleManager.addComponentStyle(name, style);
}


function showImages() {
	// console.log('showImages()');
	style['.list-card-cover'].display = 'block';
	StyleManager.addComponentStyle(name, style);
}


module.exports = {
	init: init,
	events: events
};
