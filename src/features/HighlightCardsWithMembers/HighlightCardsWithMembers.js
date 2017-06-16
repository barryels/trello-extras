'use strict';


var name = 'HighlightCardsWithMembers';
var $ = require('jquery');
var Utils = require('./../Core/Utils');
var ListListener = require('./../Listeners/ListListener');


function init() {
	update();

	Utils.subscribe(ListListener.events.LISTS_CARD_COUNT_CHANGED, update);
}


function update() {
	console.log(name + '.update()');
}


module.exports = {
	init: init
};
