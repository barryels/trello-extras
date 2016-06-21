module.exports = function () {

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

	return {
		getListCardsTotal: getListCardsTotal,
		updateListHeaderNumCards: updateListHeaderNumCards
	}

}();
