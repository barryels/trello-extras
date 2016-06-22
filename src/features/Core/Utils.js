module.exports = function () {

	var lists = null;

	var getListCardsTotal = function (list) {
		return list.find('.list-card').length;
	};

	var updateListHeaderNumCards = function (list, total, found) {
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
	};


	function isLoaded() {
		return getLists();
	}


	function getLists() {
		if (!lists) {
			lists = $('.list');
		}
		return lists;
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


	function init() {
		showListsCardCount(getLists());
	}

	return {
		init: init,
		isLoaded: isLoaded,
		getLists: getLists,
		getListCardsTotal: getListCardsTotal,
		updateListHeaderNumCards: updateListHeaderNumCards
	}

}();
