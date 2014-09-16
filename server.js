var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

function start() {
	function onRequest(req, res) {
		console.log('Server had started! Listening on port ', server.address().port);
		
		app.get('*', function() {
			console.log('REQUEST URL ============ ', req.url);
		});
	}
	var server = app.listen(8888, onRequest);
}

exports.start = start;