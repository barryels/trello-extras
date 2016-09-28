'use strict';

var $ = require('jquery');
var WindowListener = require('./../Core/WindowListener');
var KeyboardListener = require('./../Core/KeyboardListener');

module.exports = function () {


	var listOfTickCallbacks = [];


	function init() {
		update();

		WindowListener.subscribe("window:location:href:change", update);
		KeyboardListener.subscribe("keyboard:key:up:enter", update);
	}

	function update() {
		updateListsHeaderCardCounter();
	}


	function registerTickCallback(fn) {
		var id = listOfTickCallbacks.length + Math.round(Math.random() * 1000000);
		listOfTickCallbacks.push({id: id, fn: fn});
		return id;
	}


	function deregisterTickCallback(id) {
		listOfTickCallbacks.splice(id, 1);
	}


	function updateListsHeaderCardCounter() {
		getLists().each(function () {
			updateListHeaderNumCards($(this));
		});
	}


	function getListHeaderCardCounter(list) {
		if (list) {
			return list.find('.list-header').find('.be-ListHeaderCardCounter');
		}
		return null;
	}


	function updateListHeaderNumCards(list, found) {
		var listHeaderNumCards = getListHeaderCardCounter(list),
			total = getListCardsTotal(list);

		if (listHeaderNumCards.length === 0) {
			list.find('.list-header').append('<p class="be-ListHeaderCardCounter"></p>');
		}

		listHeaderNumCards = getListHeaderCardCounter(list);

		if (listHeaderNumCards) {
			listHeaderNumCards.attr('data-total', total);

			if (found === undefined || found === total) {
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
		return $('.list');
	}


	function getCards(list) {
		if (!list) {
			return $('.list-cards > .list-card');
		}
		return list.find('> .list-cards > .list-card');
	}


	function getListCardsTotal(list) {
		return getCards(list).length;
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
			listCards = getCards(list);

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
				j,
				searchWord,
				usernameToMatchAgainst;


			// Search text
			if (searchTextToFilterBy === '') {

				showCard = true;

			} else {

				// Search by username
				card.find('.member-avatar').each(function () {
					usernames.push($(this).attr('title'));
				});

				card.find('.member-initials').each(function () {
					usernames.push($(this).attr('title'));
				});

				if (usernames.length > 0) {
					for (i = 0; i < searchTextToFilterByAsWords.length; i++) {
						searchWord = searchTextToFilterByAsWords[i].toLowerCase();

						if (searchWord.indexOf('@') === 0) {

							for (j = 0; j < usernames.length; j++) {
								usernameToMatchAgainst = '@' + usernames[j].toLowerCase();

								if (usernameToMatchAgainst.indexOf(searchWord) > -1) {
									showCard = true;
									break;
								}
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
							var colour = getCardLabelColourFromClass($(this).attr('class')),
								title = $(this).attr('title'),
								id = colour + '_' + title;

							if (labelsToFilterBy.indexOf(id) > -1) {
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

		if (foundCardsTotal === listCards.length) {
			list.removeClass('be-ListFiltered');
		} else {
			list.addClass('be-ListFiltered');
		}

		updateListHeaderNumCards(list, foundCardsTotal);
	}


	function removeDuplicateObjectsFromArray(arr, field) {
		var u = [];
		arr.reduce(function (a, b) {
			if (a[field] !== b[field]) u.push(b);
			return b;
		}, []);
		return u;
	}


	/**
	 * Takes every property in an object and mutates the original object's property values
	 * to match the name of the key. One level only, for now.
	 * If you specify a prefix string, the value will be prefixed with your string
	 * If you specify a suffix string, the value will be suffixed with your string
	 * e.g.
	 * ( { hello_world: "whatever" }, "asdf_", "-today")
	 * will become:
	 *   { hello_world: "asdf_hello_world-today" }
	 * TODO:
	 * [?] Add deep nesting support
	 * [?] Allow more customisation of generated value, e.g. Uppercase, lowercase, add separators, etc.
	 *
	 * @param {object} obj
	 * @param {string=} prefix
	 * @param {string=} suffix
	 * @returns {object}
	 */
	function mirrorKeys(obj, prefix, suffix) {
		var propName;
		var propValue;
		for (propName in obj) {
			propValue = propName;
			if (prefix) {
				propValue = prefix + propValue;
			}
			if (suffix) {
				propValue = propValue + suffix;
			}
			obj[propName] = propValue;
		}
		return obj;
	}


	function subscribe(eventName, fn) {
		$.subscribe(eventName, fn);
	}


	function unsubscribe(eventName, fn) {
		$.unsubscribe(eventName, fn);
	}


	function publish(eventName, data) {
		console.log('Utils.publish()', eventName);
		$.publish(eventName, data);
	}


	return {
		init: init,
		isLoaded: isLoaded,
		mirrorKeys: mirrorKeys,
		removeDuplicateObjectsFromArray: removeDuplicateObjectsFromArray,
		// registerTickCallback: registerTickCallback,
		// deregisterTickCallback: deregisterTickCallback,
		getLists: getLists,
		getCards: getCards,
		getCardChecklists: getCardChecklists,
		getCardLabels: getCardLabels,
		getListCardsTotal: getListCardsTotal,
		updateListHeaderNumCards: updateListHeaderNumCards,
		getListHeaderCardCounter: getListHeaderCardCounter,
		getCardLabelColourFromClass: getCardLabelColourFromClass,
		filterListCards: filterListCards,
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		publish: publish
	}

}();
