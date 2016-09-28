'use strict';


var $ = require('jquery');
// var Utils = require('./features/Core/Utils');
var Settings = require('./features/Core/Settings');


function init() {
	onLoaded();
}


function onLoaded() {
	console.log('Trello Extras started!');
	// Utils.init();
	Settings.init();

	// alert('popup.onLoaded()');
}


$(document).ready(function () {
	init();
});
