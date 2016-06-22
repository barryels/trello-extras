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
