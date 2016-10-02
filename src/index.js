'use strict';

// ==UserScript==
//
// @namespace      http://www.barryels.com/
//
// @history        1.0 first version
//
// ==/UserScript==

console.log('Trello Extras loaded!');

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
var Settings = require('./features/Core/Settings');

var loadInterval;


function init() {
	// loadInterval = initLoadedCheck();
	onLoaded();
}


function initLoadedCheck() {
	return requestAnimationFrame(runLoadedCheck);
}


function runLoadedCheck() {
	console.log('Trello Extras loading...');
	if (Utils.isLoaded()) {
		console.log('Trello Extras loaded!');
		cancelAnimationFrame(loadInterval);
		onLoaded();
	} else {
		requestAnimationFrame(runLoadedCheck);
	}
}


function onLoaded() {
	console.log('Trello Extras started!');
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
	Settings.init();

	// Utils.subscribe(ListListener.events.LISTS_COUNT_CHANGED, function () {
	// 	console.log('EVENT:', ListListener.events.LISTS_COUNT_CHANGED);
	// });
	//
	// Utils.subscribe(ListListener.events.LISTS_LIST_ADDED, function () {
	// 	console.log('EVENT:', ListListener.events.LISTS_LIST_ADDED);
	// });
	//
	// Utils.subscribe(ListListener.events.LISTS_LIST_REMOVED, function () {
	// 	console.log('EVENT:', ListListener.events.LISTS_LIST_REMOVED);
	// });
	//
	//
	// Utils.subscribe(CardListener.events.CARDS_COUNT_CHANGED, function () {
	// 	console.log('EVENT:', CardListener.events.CARDS_COUNT_CHANGED);
	// });
	//
	// Utils.subscribe(CardListener.events.CARDS_CARD_ADDED, function () {
	// 	console.log('EVENT:', CardListener.events.CARDS_CARD_ADDED);
	// });
	//
	// Utils.subscribe(CardListener.events.CARDS_CARD_REMOVED, function () {
	// 	console.log('EVENT:', CardListener.events.CARDS_CARD_REMOVED);
	// });


	chrome.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
				"from the extension");
			console.log(request);
			if (request.eventName) {
				Utils.publish(request.eventName);
			}
		});

}


$(document).ready(function () {
	init();
});
