(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Utils = require('./../Core/Utils');

module.exports = function () {

	function init() {
		var windowLocationHREF = window.location.href;

		update();

		setInterval(function () {
			if (windowLocationHREF !== window.location.href) {
				windowLocationHREF = window.location.href;
				update();
			}
		}, 100);
	}

	function update() {
		Utils.getCards().each(function () {
			var progressText = Utils.getCardChecklists($(this)).find('.badge-text').text();
			drawProgressLine($(this), progressText);
		});
	}

	function drawProgressLine(card, progressText) {
		var completed = 0,
			total = 1,
			percent = 0,
			progressStatus = 'not_started',
			progressLine;

		if (progressText) {
			if (progressText.indexOf('/')) {
				completed = progressText.split('/')[0];
				total = progressText.split('/')[1];
				percent = (completed / total) * 100;

				if (percent === 0) {
					progressStatus = 'not_started';
				}

				if (percent > 0) {
					progressStatus = 'started';
				}

				if (percent > 25) {
					progressStatus = 'in_progress';
				}

				if (percent > 75) {
					progressStatus = 'nearly_done';
				}

				if (percent === 100) {
					progressStatus = 'complete';
				}

				card.append('<span class="be-CardChecklistCompletionLine be-CardChecklistCompletionLine--' + progressStatus + '"></span>');

				progressLine = card.find('.be-CardChecklistCompletionLine');
				progressLine.css('width', (percent + '%'));

				return true;
			}
		}

		return false;
	}

	return {
		init: init
	}

}();

},{"./../Core/Utils":4}],2:[function(require,module,exports){
'use strict';

var Utils = require('./../Core/Utils');

module.exports = function () {

	var init = function () {
		var windowLocationHREF = window.location.href;

		addLabelFilterToListHeader();

		update();

		setInterval(function () {
			if (windowLocationHREF !== window.location.href) {
				windowLocationHREF = window.location.href;
				update();
			}
		}, 100);
	};

	var addLabelFilterToListHeader = function (list) {

		Utils.getLists().each(function () {
			var list = $(this);
			var listHeader = list.find('.list-header'),
				filterTriggerButton,
				filterCloseButton,
				selectAllButton,
				selectNoneButton,
				filterList;

			listHeader.append('<a class="be-CardFilterByLabel__trigger dark-hover"><span class="icon-sm icon-label"></span></a>');
			listHeader.append('<div class="be-CardFilterByLabel__list">' +
				'<div class="pop-over-header js-pop-over-header"><span class="pop-over-header-title">Filter by Label</span><a href="#" class="pop-over-header-close-btn icon-sm icon-close"></a></div>' +
				'<div class="be-CardFilterByLabel__buttons">' +
				'<button class="be-CardFilterByLabel__btn-select-none">Select None</button>' +
				'<button class="be-CardFilterByLabel__btn-select-all">Select All</button>' +
				'</div>' +
				'<hr />' +
				'<div class="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent"></div>' +
				'</div>');

			filterTriggerButton = listHeader.find('.be-CardFilterByLabel__trigger');
			filterCloseButton = listHeader.find('.pop-over-header-close-btn');
			filterList = listHeader.find('.be-CardFilterByLabel__list');
			selectAllButton = listHeader.find('.be-CardFilterByLabel__btn-select-all');
			selectNoneButton = listHeader.find('.be-CardFilterByLabel__btn-select-none');

			filterList.hide(0);

			filterTriggerButton.bind('click', function (e) {
				e.stopPropagation();
				$(this).closest('.list-header').find('.be-CardFilterByLabel__list').toggle();
			});

			filterCloseButton.bind('click', function () {
				$(this).closest('.list-header').find('.be-CardFilterByLabel__list').hide();
			});

			selectAllButton.bind('click', function () {
				var filterListContent = $(this).closest('.be-CardFilterByLabel__list').find('.pop-over-content');
				filterListContent.find('[type="checkbox"]').prop('checked', true).attr('checked', 'checked');
				updateFilter(filterListContent);
			});

			selectNoneButton.bind('click', function () {
				var filterListContent = $(this).closest('.be-CardFilterByLabel__list').find('.pop-over-content');
				filterListContent.find('[type="checkbox"]').prop('checked', false).removeAttr('checked');
				updateFilter(filterListContent);
			});

		});

		$(document).bind('click', function () {
			// $('.be-CardFilterByLabel__list').hide();
		});

	};


	function update() {
		Utils.getLists().each(function () {
			var list = $(this);

			var filterListContent = list.find('.be-CardFilterByLabel__list .pop-over-content'),
				listLabelsTemp = [],
				listLabels = [],
				i,
				j;

			Utils.getCards($(this)).each(function () {
				Utils.getCardLabels($(this)).each(function () {
					var cardLabel = {
						colour: Utils.getCardLabelColourFromClass($(this).attr('class')),
						title: $(this).attr('title')
					};

					listLabelsTemp.push(cardLabel);
				});
			});

			// Only push unique labels into the listLabels array
			for (i = 0; i < listLabelsTemp.length; i++) {
				var exists;

				for (j = 0; j < listLabels.length; j++) {
					exists = false;

					if (listLabels[j].colour === listLabelsTemp[i].colour) {
						exists = true;
						break;
					}
				}

				if (!exists) {
					listLabels.push(listLabelsTemp[i]);
				}
			}

			updateLabelFilterList(filterListContent, listLabels);

		});

	}


	function updateLabelFilterList(filterListContent, listLabels) {
		var i;

		filterListContent.html('');

		filterListContent.append('<label class="be-CardFilterByLabel__list__item"><input type="checkbox" name="no-labels" checked="checked" /><span class="be-CardFilterByLabel__list__title">No Labels</span></label>');

		for (i = 0; i < listLabels.length; i++) {
			var listLabelTitle = listLabels[i].title,
				colour = listLabels[i].colour;

			if (!listLabelTitle) {
				listLabelTitle = '(' + colour.substr(0, 1).toUpperCase() + colour.substr(1, colour.length) + ')';
			}

			filterListContent.append('<label class="be-CardFilterByLabel__list__item"><input type="checkbox" name="' + colour + '" checked="checked" /><span class="be-CardFilterByLabel__list__icon card-label-' + colour + '">&nbsp;</span><span class="be-CardFilterByLabel__list__title">' + listLabelTitle + '</span></label>');
		}

		filterListContent.find('[type="checkbox"]').change(function () {
			updateFilter(filterListContent);
		});

		updateFilter(filterListContent);
	}


	function updateFilter(filterListContent) {
		var list = filterListContent.closest('.list'),
			labelsToFilterBy = [];

		filterListContent.find('[type="checkbox"]').each(function () {
			var name = $(this).attr('name');

			if (this.checked) {
				labelsToFilterBy.push(name);
			}
		});

		list.attr('data-be-CardFilterByLabel', labelsToFilterBy.join(','));

		Utils.filterListCards(list);
	}


	return {
		init: init
	}

}();

},{"./../Core/Utils":4}],3:[function(require,module,exports){
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

},{"./../Core/Utils":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var Utils = require('./../Core/Utils');

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
			inputSearch;

		listHeader.append('<input class="be-ListSearch__input" placeholder="Search..." type="text" />');

		inputSearch = listHeader.find('.be-ListSearch__input');
		inputSearch.bind('keyup', function () {
			list.attr('data-be-ListSearch', $(this).val());
			Utils.filterListCards(list);
		});

	};

	return {
		init: init
	}

}();

},{"./../Core/Utils":4}],6:[function(require,module,exports){
'use strict';

// ==UserScript==
//
// @namespace      http://www.barryels.com/
//
// @history        1.0 first version
//
// ==/UserScript==

var Utils = require('./features/Core/Utils');
var ListSearch = require('./features/ListSearch/ListSearch');
var CardPoints = require('./features/CardPoints/CardPoints');
var CardChecklistCompletionLine = require('./features/CardChecklistCompletionLine/CardChecklistCompletionLine');
var CardFilterByLabel = require('./features/CardFilterByLabel/CardFilterByLabel');

window.$ = window.jQuery = jQuery.noConflict(true);

window.addEventListener("load", init, false);

function init() {
	var loadInterval;

	loadInterval = window.setInterval(function () {
		if (Utils.isLoaded()) {
			window.clearInterval(loadInterval);
			onLoaded();
		}
	}, 100);
}

function onLoaded() {
	Utils.init();
	CardPoints.init(Utils.getLists());
	ListSearch.init(Utils.getLists());
	CardChecklistCompletionLine.init();
	CardFilterByLabel.init(Utils.getLists());
}

},{"./features/CardChecklistCompletionLine/CardChecklistCompletionLine":1,"./features/CardFilterByLabel/CardFilterByLabel":2,"./features/CardPoints/CardPoints":3,"./features/Core/Utils":4,"./features/ListSearch/ListSearch":5}]},{},[6])
//# sourceMappingURL=index.user.js.map
