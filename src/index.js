'use strict';

// ==UserScript==
//
// @namespace      http://www.barryels.com/
//
// @history        1.0 first version
//
// ==/UserScript==

console.log('Trello Extras');

var $ = require('jquery');
var EventManager = require('./features/Core/EventManager');
var WindowListener = require('./features/Listeners/WindowListener');
var KeyboardListener = require('./features/Listeners/KeyboardListener');
var ListListener = require('./features/Listeners/ListListener');
var CardListener = require('./features/Listeners/CardListener');
var Utils = require('./features/Core/Utils');

var ListHeaderCardCounter = require('./features/ListHeaderCardCounter/index');
var ListSearch = require('./features/ListSearch/ListSearch');
var CardPoints = require('./features/CardPoints/CardPoints');
var CardChecklistCompletionLine = require('./features/CardChecklistCompletionLine/CardChecklistCompletionLine');
var CardFilterByLabel = require('./features/CardFilterByLabel/CardFilterByLabel');
var HideCardCover = require('./features/HideCardCover/index');
var HighlightLastModifiedCard = require('./features/HighlightLastModifiedCard/index');
var BoardBackgroundImage = require('./features/BoardBackgroundImage/index');
var Settings = require('./features/Core/Settings');

var loadInterval;


function init() {
	runLoadedCheck();
}


function runLoadedCheck() {
	console.log('Trello Extras - Load start');

	if (Utils.isLoaded()) {
		cancelAnimationFrame(loadInterval);
		onLoaded();
	} else {
		requestAnimationFrame(runLoadedCheck);
	}
}


function onLoaded() {
	console.log('Trello Extras - Load complete');
	EventManager.init();
	WindowListener.init();
	KeyboardListener.init();
	Utils.init();
	ListListener.init();
	CardListener.init();

	ListHeaderCardCounter.init();
	CardPoints.init(Utils.getLists());
	ListSearch.init();
	CardChecklistCompletionLine.init();
	CardFilterByLabel.init();
	HideCardCover.init();
	HighlightLastModifiedCard.init();
	BoardBackgroundImage.init();
	Settings.init();
}


$(document).ready(function () {
	init();
});
