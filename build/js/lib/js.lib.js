var packageJSON = require('./../../../package.json');
var fs = require('fs');
var mkdirp = require('mkdirp');
var libDirectory = packageJSON.distDirectory + '/js/lib';

mkdirp(libDirectory, function (err) {
	if (err) {
		console.error(err);
	} else {
		fs.createReadStream('./node_modules/jquery/dist/jquery.min.js').pipe(fs.createWriteStream(libDirectory + '/jquery.min.js'));
	}
});
