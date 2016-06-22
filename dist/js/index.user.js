(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Utils = require('./../Core/Utils');

module.exports = function () {

	function init() {
		var windowLocationHREF = window.location.href;

		update();

		setInterval(function () {
			if (windowLocationHREF !== window.location.href) {
				windowLocationHREF = window.location.href;
				update();
			}
		}, 100);
	}

	function update() {
		Utils.getCards().each(function () {
			var progressText = Utils.getCardChecklists($(this)).find('.badge-text').text();
			drawProgressLine($(this), progressText);
		});
	}

	function drawProgressLine(card, progressText) {
		var completed = 0,
			total = 1,
			percent = 0,
			progressStatus = 'not_started',
			progressLine;

		if (progressText) {
			if (progressText.indexOf('/')) {
				completed = progressText.split('/')[0];
				total = progressText.split('/')[1];
				percent = (completed / total) * 100;

				if (percent === 0) {
					progressStatus = 'not_started';
				}

				if (percent > 0) {
					progressStatus = 'started';
				}

				if (percent > 25) {
					progressStatus = 'in_progress';
				}

				if (percent > 75) {
					progressStatus = 'nearly_done';
				}

				if (percent === 100) {
					progressStatus = 'complete';
				}

				card.append('<span class="be-CardChecklistCompletionLine be-CardChecklistCompletionLine--' + progressStatus + '"></span>');

				progressLine = card.find('.be-CardChecklistCompletionLine');
				progressLine.css('width', (percent + '%'));

				return true;
			}
		}

		return false;
	}

	return {
		init: init
	}

}();

},{"./../Core/Utils":3}],2:[function(require,module,exports){
'use strict';

var Utils = require('./../Core/Utils');

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
				listCards = Utils.getCards(list),
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

},{"./../Core/Utils":3}],3:[function(require,module,exports){
'use strict';

module.exports = function () {

	var lists = null;

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


	function isLoaded() {
		return getLists();
	}


	function getLists() {
		if (!lists) {
			lists = $('.list');
		}
		return lists;
	}

	function getCards(list) {
		if (list) {
			return list.find('.list-card');
		}
		return $('.list-card');
	}

	function getCardChecklists(card) {
		var checklists = card.find('[title="Checklist items"]');
		return checklists;
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


	function init() {
		showListsCardCount(getLists());
	}

	return {
		init: init,
		isLoaded: isLoaded,
		getLists: getLists,
		getCards: getCards,
		getCardChecklists: getCardChecklists,
		getListCardsTotal: getListCardsTotal,
		updateListHeaderNumCards: updateListHeaderNumCards
	}

}();

},{}],4:[function(require,module,exports){
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
					title = card.find('.list-card-title').text(),
					usernames = '';

				card.find('.member-avatar').each(function () {
					usernames += $(this).attr('title') + ' ';
				});

				if (title.toLowerCase().indexOf(value.toLowerCase()) > -1 || usernames.toLowerCase().indexOf(value.toLowerCase()) > -1) {
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

},{"./../Core/Utils":3}],5:[function(require,module,exports){
'use strict';

// ==UserScript==
//
// @namespace      http://www.barryels.com/
//
// @history        1.0 first version
//
// ==/UserScript==

var Utils = require('./features/Core/Utils');
var ListSearch = require('./features/ListSearch/ListSearch');
var CardPoints = require('./features/CardPoints/CardPoints');
var CardChecklistCompletionLine = require('./features/CardChecklistCompletionLine/CardChecklistCompletionLine');

window.$ = window.jQuery = jQuery.noConflict(true);

window.addEventListener("load", init, false);

function init() {
	console.log('Trello Extras is running...');
	var loadInterval;

	loadInterval = window.setInterval(function () {
		if (Utils.isLoaded()) {
			window.clearInterval(loadInterval);
			onLoaded();
		}
	}, 100);
}

function onLoaded() {
	Utils.init();
	CardPoints.init(Utils.getLists());
	ListSearch.init(Utils.getLists());
	CardChecklistCompletionLine.init();
}

},{"./features/CardChecklistCompletionLine/CardChecklistCompletionLine":1,"./features/CardPoints/CardPoints":2,"./features/Core/Utils":3,"./features/ListSearch/ListSearch":4}]},{},[5])
//# sourceMappingURL=index.user.js.map
