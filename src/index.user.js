'use strict';

// ==UserScript==
//
// @namespace      http://www.barryels.com/
//
// @history        1.0 first version
//
// ==/UserScript==

console.info('userscript running!');

var $ = require('jquery');
var EventManager = require('./features/Core/EventManager');
var WindowListener = require('./features/Core/WindowListener');
var KeyboardListener = require('./features/Core/KeyboardListener');
var Utils = require('./features/Core/Utils');
var ListSearch = require('./features/ListSearch/ListSearch');
var CardPoints = require('./features/CardPoints/CardPoints');
var CardChecklistCompletionLine = require('./features/CardChecklistCompletionLine/CardChecklistCompletionLine');
var CardFilterByLabel = require('./features/CardFilterByLabel/CardFilterByLabel');
var HideCardCover = require('./features/HideCardCover/index');


function init() {
	var loadInterval;

	loadInterval = window.setInterval(function () {
		console.log('loading...');
		if (Utils.isLoaded()) {
			console.log('loaded!');
			window.clearInterval(loadInterval);
			onLoaded();
		}
	}, 100);
}

function onLoaded() {
	EventManager.init();
	WindowListener.init();
	KeyboardListener.init();
	Utils.init();
	CardPoints.init(Utils.getLists());
	ListSearch.init(Utils.getLists());
	CardChecklistCompletionLine.init();
	CardFilterByLabel.init();
}

$(window).bind("load", function () {
	init();
});
