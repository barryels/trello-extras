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
var WindowListener = require('./features/Core/WindowListener');
var KeyboardListener = require('./features/Core/KeyboardListener');
var ListListener = require('./features/Core/ListListener');
var CardListener = require('./features/Core/CardListener');
var Utils = require('./features/Core/Utils');

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

	CardPoints.init(Utils.getLists());
	ListSearch.init(Utils.getLists());
	CardChecklistCompletionLine.init();
	CardFilterByLabel.init();
	HideCardCover.init();
	Settings.init();

	Utils.subscribe(ListListener.events.LISTS_COUNT_CHANGED, function () {
		console.log('EVENT:', ListListener.events.LISTS_COUNT_CHANGED);
	});

	Utils.subscribe(ListListener.events.LISTS_LIST_ADDED, function () {
		console.log('EVENT:', ListListener.events.LISTS_LIST_ADDED);
	});

	Utils.subscribe(ListListener.events.LISTS_LIST_REMOVED, function () {
		console.log('EVENT:', ListListener.events.LISTS_LIST_REMOVED);
	});


	Utils.subscribe(CardListener.events.CARDS_COUNT_CHANGED, function () {
		console.log('EVENT:', CardListener.events.CARDS_COUNT_CHANGED);
	});

	Utils.subscribe(CardListener.events.CARDS_CARD_ADDED, function () {
		console.log('EVENT:', CardListener.events.CARDS_CARD_ADDED);
	});

	Utils.subscribe(CardListener.events.CARDS_CARD_REMOVED, function () {
		console.log('EVENT:', CardListener.events.CARDS_CARD_REMOVED);
	});


	// chrome.runtime.onConnect.addListener(function (port) {
	// 	port.onMessage.addListener(function (msg) {
	// 		port.postMessage({counter: msg.counter + 1});
	// 	});
	// });


	// chrome.extension.onRequest.addListener(
	// 	function (request, sender, sendResponse) {
	// 		sendResponse({counter: request.counter + 1});
	// 	});

	chrome.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
				"from the extension");
			console.log(request);
			if (request.eventName) {
				Utils.publish(request.eventName);
			}
			// 	sendResponse({farewell: "goodbye"});
		});

	// alert('onLoaded()');
}


$(document).ready(function () {
	init();
});

// $(window).bind("load", function () {
// 	console.log('window.load()');
// });
