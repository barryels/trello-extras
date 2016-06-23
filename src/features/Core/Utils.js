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

			listHeader.append('<p class="be-ListHeaderCardCounter">' + listCards.length + '</p>');

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
				listHeaderNumCards.html('<i class="icon-sm icon-card"></i> ' + total);
			} else {
				listHeaderNumCards.html('<i class="icon-sm icon-card"></i> ' + found + ' / ' + total);
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


	function filterListCards(list) {
		var searchTextToFilterBy = '',
			searchTextToFilterByAsWords = null,
			labelsToFilterBy = null,
			foundCardsTotal = 0,
			listCards = list.find('.list-card'),
			listCardsTotal = getListCardsTotal(list);

		// Search text
		if (list.attr('data-be-ListSearch')) {
			searchTextToFilterBy = list.attr('data-be-ListSearch');
			searchTextToFilterByAsWords = searchTextToFilterBy.split(' ');
		}

		// Label filter
		if (list.attr('data-be-CardFilterByLabel')) {
			labelsToFilterBy = list.attr('data-be-CardFilterByLabel').split(',');
		}

		listCards.each(function () {
			var card = $(this),
				showCard = false,
				title = card.find('.list-card-title').text(),
				usernames = [],
				listCardLabels = getCardLabels(card),
				i,
				j;


			// Search text
			if (searchTextToFilterBy === '') {

				showCard = true;

			} else {

				// Search by username
				card.find('.member-avatar').each(function () {
					usernames.push($(this).attr('title'));
				});

				if (usernames.length > 0) {
					for (i = 0; i < searchTextToFilterByAsWords.length; i++) {
						for (j = 0; j < usernames.length; j++) {
							if (usernames[j].toLowerCase().indexOf(searchTextToFilterByAsWords[i].toLowerCase()) > -1) {
								showCard = true;
								break;
							}
						}
					}
				}


				// Search by title
				if (showCard === false) {
					if (title.toLowerCase().indexOf(searchTextToFilterBy.toLowerCase()) > -1) {
						showCard = true;
					} else {
						showCard = false;
					}
				}

			}

			// Label filter
			if (labelsToFilterBy) {
				if (showCard === true) {
					if (listCardLabels.length > 0) {
						showCard = false;

						listCardLabels.each(function () {
							var colour = getCardLabelColourFromClass($(this).attr('class'));

							if (labelsToFilterBy.indexOf(colour) > -1) {
								showCard = true;
								return false;
							}
						});
					} else {
						if (labelsToFilterBy.indexOf('no-labels') > -1) {
							showCard = true;
						} else {
							showCard = false;
						}
					}
				}
			} else {
				showCard = false;
			}

			if (showCard) {
				card.removeClass('hide');
			} else {
				card.addClass('hide');
			}

			if (!card.hasClass('hide')) {
				foundCardsTotal += 1;
			}

		});

		updateListHeaderNumCards(list, listCardsTotal, foundCardsTotal);

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
		filterListCards: filterListCards,
		removeDuplicateObjectsFromArray: removeDuplicateObjectsFromArray
	}

}();
