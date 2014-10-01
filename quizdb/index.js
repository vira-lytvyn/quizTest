var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quizdb');
var formidable = require('formidable');

var quizSchema = mongoose.Schema({
	title: { type: String, unique: true },
	description: String,
	questions: []
});
Quiz = mongoose.model('Quiz', quizSchema);

exports.createNewQuiz = function(req, res, quizTitle, quizDescription) {
	var newQuiz = new Quiz({
		title : quizTitle,
		description: quizDescription
	});

	Quiz.find({title: quizTitle}, function(err, docs) {
		if (docs.length)	{
			res.send('Quiz with this title already exist. Please go back and enter enother title!');
		} else {
			newQuiz.save(function (err, newQuiz) {
				if (err) throw err;
				res.location('/create-question&' + newQuiz._id);
				res.redirect('/create-question&' + newQuiz._id);
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

exports.removeQuiz = function(req, res, id) {
	Quiz.remove({ _id : id}, function(err) {
		if(err) throw err
		console.log('Item with id:' + id + 'was removed');
		res.location('/');
		res.redirect('/');
	});
}

exports.validateNewQuizTitle = function(req, res, newQuizTitle) {
	console.log(newQuizTitle);
	Quiz.find({title: newQuizTitle}, function(err, docs) {
		if (docs.length) {
			res.send(false);
		} else {
			res.send(true);
		}
	});
}