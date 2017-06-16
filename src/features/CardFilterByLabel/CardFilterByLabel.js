'use strict';


var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var Core = require('./../Core/index');


module.exports = function () {

	function init() {

		Utils.getLists().each(function () {
			addLabelFilterToListHeader($(this));
		});

		update();

		Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
	}

	function addLabelFilterToListHeader(list) {

		var listHeader = list.find('.list-header'),
			filterTriggerButton,
			filterCloseButton,
			selectAllButton,
			selectNoneButton,
			filterList;

		if (listHeader.find('.be-CardFilterByLabel__list .pop-over-content').length === 0) {
			listHeader.append('<div class"be-CardFilterByLabel__list"><div class="pop-over-content" style="display: none;"></div></div>');
			listHeader.append('<a class="be-CardFilterByLabel__trigger dark-hover"><span class="icon-sm icon-label"></span></a>');
			listHeader.append('<div class="be-CardFilterByLabel__list">' +
				'<div class="pop-over-header js-pop-over-header"><span class="pop-over-header-title">Filter by Label</span><a href="#" class="pop-over-header-close-btn icon-sm icon-close"></a></div>' +
				'<div class="be-CardFilterByLabel__buttons">' +
				'<a class="button-link be-CardFilterByLabel__btn-select-none">Select None</a>' +
				'<a class="button-link be-CardFilterByLabel__btn-select-all">Select All</a>' +
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
		}

	}


	function update(e) {

		console.log(e);

		if ((e) && e.type === WindowListener.events.WINDOW_LOCATION_CHANGE) {
			if (window.location.href.indexOf('&filter') > -1) {
				// Do nothing
			} else {
				Utils.getLists().each(function () {
					var list = $(this),
						filterListContent = list.find('.be-CardFilterByLabel__list .pop-over-content'),
						listLabelsTemp = [],
						listLabels = [],
						i,
						j;

					Utils.getCards($(this)).each(function () {
						Utils.getCardLabels($(this)).each(function () {
							var colour = Utils.getCardLabelColourFromClass($(this).attr('class')),
								title = $(this).attr('title'),
								id = colour + '_' + title;

							var cardLabel = {
								id: id,
								colour: colour,
								title: title
							};

							listLabelsTemp.push(cardLabel);
						});
					});

					// Only push unique labels into the listLabels array
					for (i = 0; i < listLabelsTemp.length; i++) {
						var exists;

						for (j = 0; j < listLabels.length; j++) {
							exists = false;

							if (listLabels[j].id === listLabelsTemp[i].id) {
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
		}

	}


	function updateLabelFilterList(filterListContent, listLabels) {
		var i;

		filterListContent.html('');

		filterListContent.append('<label class="be-CardFilterByLabel__list__item"><input type="checkbox" name="no-labels" checked="checked" /><span class="be-CardFilterByLabel__list__title">No Labels</span></label>');

		for (i = 0; i < listLabels.length; i++) {
			var id = listLabels[i].id,
				listLabelTitle = listLabels[i].title,
				colour = listLabels[i].colour;

			if (!listLabelTitle) {
				listLabelTitle = '(' + colour.substr(0, 1).toUpperCase() + colour.substr(1, colour.length) + ')';
			}

			filterListContent.append('<label class="be-CardFilterByLabel__list__item"><input type="checkbox" name="' + id + '" checked="checked" /><span class="be-CardFilterByLabel__list__icon card-label-' + colour + '">&nbsp;</span><span class="be-CardFilterByLabel__list__title">' + listLabelTitle + '</span></label>');
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

		Core.filterListCards(list);
	}


	return {
		init: init
	}

}();
