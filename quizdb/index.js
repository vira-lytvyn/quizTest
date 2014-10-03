var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quizdb');
var formidable = require('formidable');
var bodyParser = require('body-parser');

var quizSchema = mongoose.Schema({
	title: { type: String, unique: true },
	description: String,
	questions: []
});
Quiz = mongoose.model('Quiz', quizSchema);

exports.createNewQuiz = function(req, res) {
	var title = req.body.title,
			description = req.body.description;

	var newQuiz = new Quiz({
		title : title,
		description: description
	});

	Quiz.find({title: title}, function(err, docs) {
		if (err) throw err
		if (docs.length)	{
			res.send(false);
		} else {
			newQuiz.save(function (err, newQuiz) {
				if (err) throw err;
				res.send(true);
			});
		}
	});
}

exports.createNewQuestion = function(req, res, id) {
	Quiz.findById(id, function(err, docs) {
		if(err) throw err
		
	});
}

exports.getAllQuizes = function(req, res) {
	Quiz.find(function(err, docs) {
		if(err) throw err
		res.send(docs);
	});
}

exports.createNewQuestionRenderer = function(req, res, id) {
	Quiz.findById(id, function(err, docs) {
		if(err) throw err
		res.render('create-question', { title: 'Create question for the "' + docs.title + '"'});		
	});
}

exports.removeQuiz = function(req, res) {
	var id = req.body.id;
	Quiz.remove({ _id : id}, function(err) {
		if(err) {
			console.log(err);
			res.send(false);
		} else {
			console.log('Item with id:' + id + 'was removed');
			res.send(true);
		}
	});
}

exports.validateNewQuizTitle = function(req, res) {
	Quiz.find({title: req.body.title}, function(err, docs) {
		if (err) throw err
		if (docs.length) {
			res.send(false);
		} else {
			res.send(true);
		}
	});
}