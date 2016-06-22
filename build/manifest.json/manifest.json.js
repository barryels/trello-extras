'use strict';

var packageJSON = require('./../../package.json');
var fs = require('fs');
var manifestJSONTemplate = packageJSON.manifestJSONTemplate;

manifestJSONTemplate.name = packageJSON.name;
manifestJSONTemplate.version = packageJSON.version;
manifestJSONTemplate.description = packageJSON.description;
manifestJSONTemplate.author = packageJSON.author;

fs.writeFile(packageJSON.distDirectory + '/manifest.json', JSON.stringify(manifestJSONTemplate, null, '	'), function (err) {
	if (err) {
		return console.log(err);
	}
	return true;
});
