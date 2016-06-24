'use strict';

var $ = require('jquery');
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
