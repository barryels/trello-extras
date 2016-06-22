'use strict';

var Utils = require('./../Core/Utils');

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
			listCardsTotal = Utils.getListCardsTotal(list);

		listHeader.append('<input class="be-ListSearch__input" placeholder="Search..." type="text" />');

		inputSearch = listHeader.find('.be-ListSearch__input');
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

			Utils.updateListHeaderNumCards(list, listCardsTotal, foundCardsTotal);

		});

	};

	return {
		init: init
	}

}();
