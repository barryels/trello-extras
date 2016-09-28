'use strict';


var $ = require('jquery');
var j2c = require('j2c');


function addHeadStyle(id, css) {
	var cssString = '';
	var head = getHTMLHead();
	var style;

	id = 'StyleManager_' + id;
	style = getOrCreateDOMStyleElement(id);
	style.innerHTML = '';

	if (typeof css === 'string') {
		cssString = css;
	} else {
		cssString = j2c.sheet(css);
	}

	style.appendChild(document.createTextNode(cssString));

	head.appendChild(style);
}


function addComponentStyle(id, css) {
	addHeadStyle(id, {
		'@global': css
	});
}


function getOrCreateDOMStyleElement(id) {
	var el = document.getElementById(id);
	if (el) {
		return el;
	} else {
		return createDOMStyleElement(id);
	}
}


function createDOMStyleElement(id) {
	var el = document.createElement('style');
	el.id = id;
	return el;
}


function getHTMLHead() {
	return document.head || document.getElementsByTagName('head')[0];
}


module.exports = {
	addHeadStyle: addHeadStyle,
	addComponentStyle: addComponentStyle
};
