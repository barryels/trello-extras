'use strict';


var test = require('tape');


test('Utils.getCardIDFromCardURL', function (t) {
	var getCardIDFromCardURL = require('./Utils').getCardIDFromCardURL;

	t.plan(8);

	t.equal(getCardIDFromCardURL(null), null);
	t.equal(getCardIDFromCardURL(''), null);
	t.equal(getCardIDFromCardURL('https://chrome.google.com/webstore/detail/trello-extras/eljmgmdnmlfabhkkjplfennnnjnhhaog'), null);
	t.equal(getCardIDFromCardURL('https://trello.com/b/12345/things'), null);
	t.equal(getCardIDFromCardURL('https://trello.com/c/1R31vJoZ/97-desk-organiser'), '1R31vJoZ');
	t.equal(getCardIDFromCardURL('https://trello.com/c/EbKkeUl7/36-gvc-assist-v2-0-8-v2-1-0'), 'EbKkeUl7');
	t.equal(getCardIDFromCardURL('/c/1R31vJoZ/97-desk-organiser'), '1R31vJoZ');
	t.equal(getCardIDFromCardURL('/c/EbKkeUl7/36-gvc-assist-v2-0-8-v2-1-0'), 'EbKkeUl7');
});
