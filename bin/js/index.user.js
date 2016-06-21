(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var utils = require('./../Core/Utils');

module.exports = function () {

	/*
	 Sums up the card points in a particular list
	 */
	function init(lists) {
		var windowLocationHREF = window.location.href;

		update(lists);

		setInterval(function () {
			if (windowLocationHREF !== window.location.href) {
				windowLocationHREF = window.location.href;
				update(lists);
			}
		}, 100);

	}

	function update(lists) {
		lists.each(function () {
			var list = $(this),
				listHeader = list.find('.list-header'),
				beListPointsTotal,
				listCards = list.find('.list-card'),
				total = 0;

			beListPointsTotal = listHeader.find('.be-list-points-total');
			if (beListPointsTotal.length === 0) {
				listHeader.append('<p class="be-list-points-total"></p>');
				beListPointsTotal = listHeader.find('.be-list-points-total');
			}

			listCards.each(function () {
				var listCard = $(this),
					cardID = listCard.find('.card-short-id').text(),
					title = listCard.find('.list-card-title').text(),
					titleStrippedOfNumber = title.substr(cardID.length, title.length),
					cardPoints = 0;

				if (titleStrippedOfNumber.indexOf('(') === 0) {
					cardPoints = parseInt(titleStrippedOfNumber.substring(1, titleStrippedOfNumber.indexOf(')') + 1));

					if (isNaN(cardPoints)) {
						cardPoints = 0;
					}
				}

				total += cardPoints;
			});

			beListPointsTotal.html(total + ' points');

		});
	}


	return {
		init: init
	}

}();

},{"./../Core/Utils":2}],2:[function(require,module,exports){
module.exports = function () {

	var getListCardsTotal = function (list) {
		return list.find('.list-card').length;
	};

	var updateListHeaderNumCards = function (list, total, found) {
		var listHeader = list.find('.list-header'),
			listHeaderNumCards = listHeader.find('.be-list-header-num-cards');

		if (listHeaderNumCards) {
			listHeaderNumCards.attr('data-total', total);

			if (found === total) {
				listHeaderNumCards.html(total + ' cards');
			} else {
				listHeaderNumCards.html(found + ' / ' + total + ' cards');
			}

			return true;
		}

		return false;
	};

	return {
		getListCardsTotal: getListCardsTotal,
		updateListHeaderNumCards: updateListHeaderNumCards
	}

}();

},{}],3:[function(require,module,exports){
'use strict';

var utils = require('./../Core/Utils');

module.exports = function () {

	/*
	 Adds a search box to each list for simple filtering of cards based on their title
	 */
	var init = function (lists) {
		lists.each(function () {
			addSearchToList($(this));
		})
	};

	var addSearchToList = function (list) {
		var listHeader = list.find('.list-header'),
			inputSearch,
			listCards = list.find('.list-card'),
			listCardsTotal = utils.getListCardsTotal(list);

		listHeader.append('<input class="be-input-search" placeholder="Search..." type="text" />');

		inputSearch = listHeader.find('.be-input-search');
		inputSearch.bind('keyup', function () {
			var value = $(this).val();
			var foundCardsTotal = 0;

			listCards.each(function () {
				var card = $(this),
					title = card.find('.list-card-title').text();

				if (title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
					card.removeClass('hide');
					foundCardsTotal += 1;
				} else {
					card.addClass('hide');
				}

			});

			utils.updateListHeaderNumCards(list, listCardsTotal, foundCardsTotal);

		});

	};

	return {
		init: init
	}

}();

},{"./../Core/Utils":2}],4:[function(require,module,exports){
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





},{"./features/CardPoints/CardPoints":1,"./features/ListSearch/ListSearch":3}]},{},[4])
//# sourceMappingURL=index.user.js.map
