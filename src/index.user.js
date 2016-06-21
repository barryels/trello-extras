// ==UserScript==
//
// @namespace      http://www.barryels.com/
//
// @history        1.0 first version
//
// ==/UserScript==


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
	var windowLocationHREF = window.location.href;
	var lists = $('.list');

	showListsCardCount(lists);
	sumListsCardPoints(lists, 'direct');
	addSearchToLists(lists);

	setInterval(function () {
		if (windowLocationHREF !== window.location.href) {
			windowLocationHREF = window.location.href;
			sumListsCardPoints(lists);
		}
	}, 100);

}


/*
 Sums up the card points in a particular list
 */
function sumListsCardPoints(lists) {

	lists.each(function () {
		var list = $(this),
			listHeader = list.find('.list-header'),
			beListPointsTotal,
			listCards = list.find('.list-card'),
			total = 0;

		listHeader.append('<p class="be-list-points-total"></p>');
		beListPointsTotal = listHeader.find('.be-list-points-total');

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


/*
 Adds a search box to each list for simple filtering of cards based on their title
 */
function addSearchToLists(lists) {
	lists.each(function () {
		addSearchToList($(this));
	})
}

function addSearchToList(list) {
	var listHeader = list.find('.list-header'),
		inputSearch,
		listCards = list.find('.list-card'),
		listCardsTotal = _getListCardsTotal(list);

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

		_updateListHeaderNumCards(list, listCardsTotal, foundCardsTotal);

	});
}


function _getListCardsTotal(list) {
	return list.find('.list-card').length;
}

function _updateListHeaderNumCards(list, total, found) {
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
}
