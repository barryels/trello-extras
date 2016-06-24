'use strict';

// ==UserScript==
//
// @namespace      http://www.barryels.com/
//
// @history        1.0 first version
//
// ==/UserScript==

var EventManager = require('./features/Core/EventManager');
var WindowListener = require('./features/Core/WindowListener');
var KeyboardListener = require('./features/Core/KeyboardListener');
var Utils = require('./features/Core/Utils');
var ListSearch = require('./features/ListSearch/ListSearch');
var CardPoints = require('./features/CardPoints/CardPoints');
var CardChecklistCompletionLine = require('./features/CardChecklistCompletionLine/CardChecklistCompletionLine');
var CardFilterByLabel = require('./features/CardFilterByLabel/CardFilterByLabel');

window.addEventListener("load", init, false);

function init() {
	var loadInterval;

	loadInterval = window.setInterval(function () {
		if (Utils.isLoaded()) {
			window.clearInterval(loadInterval);
			onLoaded();
		}
	}, 100);
}

function onLoaded() {
	console.info('onLoaded()');
	EventManager.init();
	WindowListener.init();
	KeyboardListener.init();
	Utils.init();
	CardPoints.init(Utils.getLists());
	ListSearch.init(Utils.getLists());
	CardChecklistCompletionLine.init();
	CardFilterByLabel.init();
}
