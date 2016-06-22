'use strict';

module.exports = function () {

	var lists = null;

	function getListCardsTotal(list) {
		return list.find('.list-card').length;
	}

	function addListsHeaderCardCounter(lists) {

		lists.each(function () {
			var list = $(this),
				listCards = list.find('.list-card'),
				listHeader = list.find('.list-header');

			listHeader.append('<p class="be-ListHeaderCardCounter">' + listCards.length + ' cards</p>');

		});
	}

	function getListHeaderCardCounter(list) {
		if (list) {
			return list.find('.be-ListHeaderCardCounter');
		}
		return null;
	}

	function updateListHeaderNumCards(list, total, found) {
		var listHeaderNumCards = getListHeaderCardCounter(list);

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
		return card.find('[title="Checklist items"]');
	}

	function getCardLabels(card) {
		return card.find('.card-label');
	}

	function getCardLabelColourFromClass(className) {
		var classes = className.split(' '),
			i,
			result = '';

		for (i = 0; i < classes.length; i++) {
			if (classes[i].indexOf('card-label-') > -1) {
				result = classes[i].split('-')[2];
				break;
			}
		}
		
		return result;
	}

	function removeDuplicateObjectsFromArray(arr, field) {
		var u = [];
		arr.reduce(function (a, b) {
			if (a[field] !== b[field]) u.push(b);
			return b;
		}, []);
		return u;
	}


	function init() {
		addListsHeaderCardCounter(getLists());
	}

	return {
		init: init,
		isLoaded: isLoaded,
		getLists: getLists,
		getCards: getCards,
		getCardChecklists: getCardChecklists,
		getCardLabels: getCardLabels,
		getListCardsTotal: getListCardsTotal,
		updateListHeaderNumCards: updateListHeaderNumCards,
		getListHeaderCardCounter: getListHeaderCardCounter,
		getCardLabelColourFromClass: getCardLabelColourFromClass,
		removeDuplicateObjectsFromArray: removeDuplicateObjectsFromArray
	}

}();
