'use strict';

var packageJSON = require('./../../package.json');
var exec = require('child_process').exec;

var gitAdd,
	gitCommit,
	gitTag;

console.log(packageJSON.version);

gitAdd = exec("git add -A '*'", function (error, stdout, stderr) {
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	} else {
		gitCommit = exec("git commit -m 'version bump'", function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});
	}
});

