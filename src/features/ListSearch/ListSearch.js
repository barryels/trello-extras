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
