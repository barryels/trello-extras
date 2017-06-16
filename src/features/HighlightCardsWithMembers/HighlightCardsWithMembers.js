'use strict';


var name = 'HighlightCardsWithMembers';
var $ = require('jquery');
var Utils = require('./../Core/Utils');
var MouseListener = require('./../Listeners/MouseListener');
var KeyboardListener = require('./../Listeners/KeyboardListener');
var WindowListener = require('./../Listeners/WindowListener');
var StyleManager = require('./../Core/StyleManager');
var css = {};


css['.' + name] = {

	'&--ShouldHaveMember': {
		background: '#cc0000 !important',
	},

	'&--ShouldNotHaveMember': {
		background: '#cc0000 !important',
	}
};


function init() {
	update();

	Utils.subscribe(WindowListener.events.WINDOW_LOAD_COMPLETE, update);
	Utils.subscribe(MouseListener.events.MOUSE_UP, update);
	Utils.subscribe(KeyboardListener.events.KEY_UP_ANY, update);
	StyleManager.addComponentStyle(name, css);
}


function update() {
	console.log(name + '.update()');
	Utils.getCards().removeClass(name + '--ShouldHaveMember');
	Utils.getCards().removeClass(name + '--ShouldNotHaveMember');

	setTimeout(function () {
		Utils.getLists().each(function () {
			var listTitle = Utils.getListTitle($(this));
			var cards = Utils.getCards($(this));
			cards.each(function () {
				if (listTitle.indexOf('In ') === 0) {
					if ($(this).find('.member').length === 0) {
						$(this).addClass(name + '--ShouldHaveMember');
					}
				} else {
					if ($(this).find('.member').length > 0) {
						$(this).addClass(name + '--ShouldNotHaveMember');
					}
				}
			});
		});
	}, 0);
}


module.exports = {
	init: init
};
