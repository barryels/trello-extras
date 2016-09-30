'use strict';

/*

 */


var name = 'Core';
var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var KeyboardListener = require('./../Listeners/KeyboardListener');
var StyleManager = require('./../Core/StyleManager');


var events = Utils.mirrorKeys({
	CORE_LIST_CARDS_FILTERED: ''
});


var style = {};

style['.list-header'] = {
	' .be-ListHeaderCardCounter': {
		margin: '3px 0 0 0'
	}
};


function init() {
	update();
}


function update() {
}


function filterListCards(list) {
	var searchTextToFilterBy = '',
		searchTextToFilterByAsWords = null,
		labelsToFilterBy = null,
		foundCardsTotal = 0,
		listCards = Utils.getCards(list);

	// Search text
	if (list.attr('data-be-ListSearch')) {
		searchTextToFilterBy = list.attr('data-be-ListSearch');
		searchTextToFilterByAsWords = searchTextToFilterBy.split(' ');
	}

	// Label filter
	if (list.attr('data-be-CardFilterByLabel')) {
		labelsToFilterBy = list.attr('data-be-CardFilterByLabel').split(',');
	}

	listCards.each(function () {
		var card = $(this),
			showCard = false,
			title = card.find('.list-card-title').text(),
			usernames = [],
			listCardLabels = Utils.getCardLabels(card),
			i,
			j,
			searchWord,
			usernameToMatchAgainst;


		// Search text
		if (searchTextToFilterBy === '') {

			showCard = true;

		} else {

			// Search by username
			card.find('.member-avatar').each(function () {
				usernames.push($(this).attr('title'));
			});

			card.find('.member-initials').each(function () {
				usernames.push($(this).attr('title'));
			});

			if (usernames.length > 0) {
				for (i = 0; i < searchTextToFilterByAsWords.length; i++) {
					searchWord = searchTextToFilterByAsWords[i].toLowerCase();

					if (searchWord.indexOf('@') === 0) {

						for (j = 0; j < usernames.length; j++) {
							usernameToMatchAgainst = '@' + usernames[j].toLowerCase();

							if (usernameToMatchAgainst.indexOf(searchWord) > -1) {
								showCard = true;
								break;
							}
						}

					}
				}
			}


			// Search by title
			if (showCard === false) {
				if (title.toLowerCase().indexOf(searchTextToFilterBy.toLowerCase()) > -1) {
					showCard = true;
				} else {
					showCard = false;
				}
			}

		}

		// Label filter
		if (labelsToFilterBy) {
			if (showCard === true) {
				if (listCardLabels.length > 0) {
					showCard = false;

					listCardLabels.each(function () {
						var colour = Utils.getCardLabelColourFromClass($(this).attr('class')),
							title = $(this).attr('title'),
							id = colour + '_' + title;

						if (labelsToFilterBy.indexOf(id) > -1) {
							showCard = true;
							return false;
						}
					});
				} else {
					if (labelsToFilterBy.indexOf('no-labels') > -1) {
						showCard = true;
					} else {
						showCard = false;
					}
				}
			}
		} else {
			showCard = false;
		}

		if (showCard) {
			card.removeClass('hide');
		} else {
			card.addClass('hide');
		}

		if (!card.hasClass('hide')) {
			foundCardsTotal += 1;
		}

	});

	if (foundCardsTotal === listCards.length) {
		list.removeClass('be-ListFiltered');
	} else {
		list.addClass('be-ListFiltered');
	}

	// updateListHeaderNumCards(list, foundCardsTotal);
}


module.exports = {
	init: init,
	events: events,
	filterListCards: filterListCards
};
