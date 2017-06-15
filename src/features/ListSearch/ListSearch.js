'use strict';

/*
 Adds a search box to each list for simple filtering of cards based on their title
 */

var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var ListListener = require('./../Listeners/ListListener');
var Core = require('./../Core/index');

module.exports = function () {


	function init() {
		update();

		Utils.subscribe(ListListener.events.LISTS_COUNT_CHANGED, update);
		Utils.subscribe(WindowListener.events.WINDOW_LOAD_COMPLETE, update);
	}


	function update() {
		var lists = Utils.getLists();

		lists.each(function () {
			var list = $(this);
			if (!doesListHaveSearchBox(list)) {
				addSearchToList(list);
			}
		});
	}


	function doesListHaveSearchBox(list) {
		if (list.find('.be-ListSearch__input').length > 0) {
			return true;
		}

		return false;
	}


	function addSearchToList(list) {
		var listHeader = list.find('.list-header'),
			inputSearch;

		listHeader.append('<input class="be-ListSearch__input" placeholder="Search..." type="text" />');

		inputSearch = listHeader.find('.be-ListSearch__input');
		inputSearch.bind('keyup', function () {
			list.attr('data-be-ListSearch', $(this).val());
			Core.filterListCards(list);
		});

	}


	return {
		init: init
	};

}();
