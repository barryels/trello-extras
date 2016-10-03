'use strict';

var $ = require('jquery');
// var WindowListener = require('./../Core/WindowListener');
// var KeyboardListener = require('./../Core/KeyboardListener');

module.exports = function () {


	var listOfTickCallbacks = [];


	function init() {
		// update();

		// subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
		// KeyboardListener.subscribe("keyboard:key:up:enter", update);
	}


	function registerTickCallback(fn) {
		var id = listOfTickCallbacks.length + Math.round(Math.random() * 1000000);
		listOfTickCallbacks.push({id: id, fn: fn});
		return id;
	}


	function deregisterTickCallback(id) {
		listOfTickCallbacks.splice(id, 1);
	}


	function isLoaded() {
		return getLists();
	}


	function findDOMElement(selector) {
		return $(selector);
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

	function getCardTitles(list) {
		if (!list) {
			return $('.list-card-title');
		}
		return list.find('.list-card-title');
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

		findDOMElement: findDOMElement,

		getLists: getLists,
		getCards: getCards,
		getCardTitles: getCardTitles,
		getCardChecklists: getCardChecklists,
		getCardLabels: getCardLabels,
		getListCardsTotal: getListCardsTotal,
		getCardLabelColourFromClass: getCardLabelColourFromClass,

		// registerTickCallback: registerTickCallback,
		// deregisterTickCallback: deregisterTickCallback,

		subscribe: subscribe,
		unsubscribe: unsubscribe,
		publish: publish
	}

}();
