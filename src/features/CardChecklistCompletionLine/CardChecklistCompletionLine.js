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
