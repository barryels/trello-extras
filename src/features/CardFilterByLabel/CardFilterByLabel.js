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
				filterList;

			listHeader.append('<a class="be-CardFilterByLabel__trigger dark-hover"><span class="icon-sm icon-label"></span></a>');
			listHeader.append('<ul class="be-CardFilterByLabel__list"></ul>');

			filterTriggerButton = listHeader.find('.be-CardFilterByLabel__trigger');
			filterList = listHeader.find('.be-CardFilterByLabel__list');

			filterList.hide(0);

			filterTriggerButton.bind('click', function () {
				$(this).closest('.list-header').find('.be-CardFilterByLabel__list').toggle();
			});

		});

	};


	function update() {
		Utils.getLists().each(function () {
			var list = $(this);

			var filterList = list.find('.be-CardFilterByLabel__list'),
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

			updateLabelFilterList(filterList, listLabels);

		});

	}


	function updateLabelFilterList(filterList, listLabels) {
		var i;

		filterList.html('<li><label><input type="checkbox" name="no-labels" checked="checked" />[ No Labels ]</label></li>');

		for (i = 0; i < listLabels.length; i++) {
			var listLabelTitle = listLabels[i].title,
				colour = listLabels[i].colour;

			if (!listLabelTitle) {
				listLabelTitle = '( ' + colour.substr(0, 1).toUpperCase() + colour.substr(1, colour.length) +' )';
			}
			filterList.append('<li><label><input type="checkbox" name="' + colour + '" checked="checked" />' + listLabelTitle + '</label></li>');

			filterList.find('[type="checkbox"]').change(function () {
				updateFilter(filterList);
			});

			updateFilter(filterList);
		}
	}


	function updateFilter(filterList) {
		var list = filterList.closest('.list'),
			labelsToFilterBy = [];

		filterList.find('[type="checkbox"]').each(function () {
			if (this.checked) {
				labelsToFilterBy.push($(this).attr('name'));
			}
		});

		list.attr('data-be-CardFilterByLabel', labelsToFilterBy.join(','));

		Utils.filterListCards(list);
	}


	return {
		init: init
	}

}();
