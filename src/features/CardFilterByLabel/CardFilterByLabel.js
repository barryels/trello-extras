'use strict';

var utils = require('./../Core/Utils');

module.exports = function () {

	var init = function (lists) {
		lists.each(function () {
			addLabelFilterToList($(this));
		})
	};

	var addLabelFilterToList = function (list) {
		var listHeader = list.find('.list-header'),
			filterButton,
			listCards = list.find('.list-card'),
			listCardsTotal = utils.getListCardsTotal(list);

		listHeader.append('<i class="be-CardFilterByLabel__icon"></i>');
		listHeader.append('<ul class="be-CardFilterByLabel__list">' +
			'<li></li>' +
			'</ul>');

		filterButton = listHeader.find('.be-CardFilterByLabel__icon');

		filterButton.bind('click', function () {
			$(this).closest('.be-CardFilterByLabel').toggle();
		});

		inputSearch.bind('keyup', function () {
			var value = $(this).val();
			var foundCardsTotal = 0;

			listCards.each(function () {
				var card = $(this),
					title = card.find('.list-card-title').text();

				// if (title.toLowerCase().indexOf(value.toLowerCase()) > -1 || usernames.toLowerCase().indexOf(value.toLowerCase()) > -1) {
				// 	card.removeClass('hide');
				// 	foundCardsTotal += 1;
				// } else {
				// 	card.addClass('hide');
				// }

			});

			utils.updateListHeaderNumCards(list, listCardsTotal, foundCardsTotal);

		});

	};

	return {
		init: init
	}

}();
