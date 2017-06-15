'use strict';

/*
 Sums up the card points in a particular list
 */

var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var KeyboardListener = require('./../Listeners/KeyboardListener');
var CardListener = require('./../Listeners/CardListener');

module.exports = function () {

	function init() {
		update();

		Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
		Utils.subscribe(WindowListener.events.WINDOW_LOAD_COMPLETE, update);
		Utils.subscribe(KeyboardListener.events.KEY_UP_ENTER, update);
		Utils.subscribe(CardListener.events.CARDS_COUNT_CHANGED, update);
	}

	function update() {
		console.log('ListHeaderStoryPointCounter.update()', Utils.getLists());
		Utils.getLists().each(function () {
			var list = $(this),
				listHeader = list.find('.be-core-list-header-container'),
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
					title = title.substr(cardID.length, title.length),
					title = title.split(' ').join(''),
					cardPoints = 0;

				var regex = /\([0-9]+\)/g;
				var matches = title.match(regex);

				if (matches !== null) {
					matches.forEach(function (match) {
						cardPoints += Number(match.split('(').join('').split(')').join(''));
					});
				}

				total += cardPoints;
			});

			beListPointsTotal.html('<i class="icon-sm icon-star"></i> ' + total);

		});
	}


	return {
		init: init
	};

}();
