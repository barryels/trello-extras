'use strict';

/*
 Sums up the card points in a particular list
 */

var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var KeyboardListener = require('./../Listeners/KeyboardListener');

module.exports = function () {

	function init() {
		update();

		Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
		KeyboardListener.subscribe("keyboard:key:up:enter", update);
	}

	function update() {
		Utils.getLists().each(function () {
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

			beListPointsTotal.html('<i class="icon-sm icon-star"></i> ' + total);

		});
	}


	return {
		init: init
	}

}();
