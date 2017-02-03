'use strict';

var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');

module.exports = function () {

	function init() {
		update();

		Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
	}

	function update() {
		var settingsCardTitle = Utils.getCardTitleFromCard(Utils.getSettingsCard());
		var settings = settingsCardTitle.split(' ');

		Utils.each(settings, function (setting) {
			if (setting.substr(0, 3) === 'bg:') {
				Utils.findDOMElement('body').css('background-image', 'url(' + setting.substr(3, setting.length) + ')');
			}
		});

	}

	return {
		init: init
	};

}();
