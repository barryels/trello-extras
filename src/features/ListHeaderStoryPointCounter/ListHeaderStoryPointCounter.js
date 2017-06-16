'use strict';

/*
 Sums up the card points in a particular list
 */

var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var KeyboardListener = require('./../Listeners/KeyboardListener');
var CardListener = require('./../Listeners/CardListener');


var storyPointTypes = {
	ESTIMATED: 'ESTIMATED',
	ACTUAL: 'ACTUAL'
};


module.exports = function () {

	function init() {
		update();

		Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
		Utils.subscribe(WindowListener.events.WINDOW_LOAD_COMPLETE, update);
		Utils.subscribe(KeyboardListener.events.KEY_UP_ENTER, update);
		Utils.subscribe(CardListener.events.CARDS_COUNT_CHANGED, update);
	}


	function getPointsForCard(type, cardTitle) {
		var regex,
			matches,
			pointsCount = 0,
			surroundingBrackets = [];

		if (type === storyPointTypes.ESTIMATED) {
			surroundingBrackets = ['(', ')'];
			regex = /\([0-9]+\)/g;
		} else {
			surroundingBrackets = ['[', ']'];
			regex = /\[[0-9]+\]/g;
		}

		matches = cardTitle.match(regex);

		if (matches !== null) {
			matches.forEach(function (match) {
				pointsCount += Number(match.split(surroundingBrackets[0]).join('').split(surroundingBrackets[1]).join(''));
			});
		}

		return pointsCount;
	}


	function update() {
		Utils.getLists().each(function () {
			var list = $(this),
				listHeader = list.find('.be-core-list-header-container'),
				beListPointsTotal,
				listCards = Utils.getCards(list),
				estimatedTotal = 0,
				actualTotal = 0;

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
					estimatedCardPoints = getPointsForCard(storyPointTypes.ESTIMATED, title),
					actualCardPoints = getPointsForCard(storyPointTypes.ACTUAL, title);

				estimatedTotal += estimatedCardPoints;
				actualTotal += actualCardPoints;
			});

			beListPointsTotal.html('<a href="#" title="Story Points -> Actual: ' + actualTotal + '; Estimated: ' + estimatedTotal + '" style="text-decoration:none;"><i class="icon-sm icon-information"></i> ' + actualTotal + ' / ' + estimatedTotal + '</a>');

		});
	}


	return {
		init: init
	};

}();
