'use strict';

var $ = require('jquery');
var Utils = require('./../Core/Utils');
var WindowListener = require('./../Listeners/WindowListener');

module.exports = function () {

	function init() {
		console.log('BoardBackgroundImage!');
		setTimeout(function () {
			update();
		}, 250);

		Utils.subscribe(WindowListener.events.WINDOW_LOCATION_CHANGE, update);
	}

	function update() {
		var settingsCardTitle = Utils.getCardTitleFromCard(Utils.getSettingsCard());
		var settings = settingsCardTitle.split(' ');
		console.log('settings', settings);

		Utils.each(settings, function (setting) {
			// console.log('setting:', setting);
			if (setting.substr(0, ('bg:').length) === 'bg:') {
				Utils.findDOMElement('body').css('background-image', 'url(' + setting.substr(3, setting.length) + ')');
			}

			if (setting.substr(0, ('bgcolor:').length) === 'bgcolor:') {
				Utils.findDOMElement('body').css('background-color', setting.substr(('bgcolor:').length, setting.length));
			}
		});

	}

	return {
		init: init
	};

}();
