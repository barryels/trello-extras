'use strict';

var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');
var KeyboardListener = require('./../Listeners/KeyboardListener');

module.exports = function () {

	function init() {
		update();

		Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
		KeyboardListener.subscribe("keyboard:key:up:enter", update);
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

				card.find('.be-CardChecklistCompletionLine').remove();
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
