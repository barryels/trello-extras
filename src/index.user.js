// ==UserScript==
//
// @namespace      http://www.barryels.com/
//
// @history        1.0 first version
//
// ==/UserScript==

'use strict';

var listSearch = require('./features/ListSearch/ListSearch');
var cardPoints = require('./features/CardPoints/CardPoints');

window.$ = window.jQuery = jQuery.noConflict(true);

window.addEventListener("load", init, false);

function init() {
	console.log('Trello Extras is running...');
	var loadInterval;

	loadInterval = window.setInterval(function () {
		if ($('.list')) {
			window.clearInterval(loadInterval);
			onLoaded();
		}
	}, 100);
}

function onLoaded() {
	var lists = $('.list');

	showListsCardCount(lists);
	cardPoints.init(lists);
	listSearch.init(lists);

}


/*
 Displays the card count beneath the title (required for sumListsCardPoints & addSearchToList
 */
function showListsCardCount(lists) {

	lists.each(function () {
		var list = $(this),
			listCards = list.find('.list-card'),
			listHeader = list.find('.list-header');

		listHeader.append('<p class="be-list-header-num-cards">' + listCards.length + ' cards</p>');

	});
}




