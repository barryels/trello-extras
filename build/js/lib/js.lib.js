var fs = require('fs');
var mkdirp = require('mkdirp');
var libDirectory = 'bin/js/lib';

mkdirp(libDirectory, function (err) {
	if (err) {
		console.error(err);
	} else {
		fs.createReadStream('./node_modules/jquery/dist/jquery.min.js').pipe(fs.createWriteStream('./bin/js/lib/jquery.min.js'));
	}
});
