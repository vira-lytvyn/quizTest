var express = require('express');
var router = express.Router();
var quizDbMethods = require('../quizDb');


router.get('/quizapi/getallquizes', function(req, res) {
	quizDbMethods.getAllQuizes(req, res);
});

router.get('/create-quiz', function(req, res) {
	res.render('create-quiz', {title: 'New quiz'})
});

router.post('/create-new-quiz-post', function(req, res) {
	quizDbMethods.createNewQuiz(req, res, req.body.newQuizTitle, req.body.newQuizDescription);
});

router.get('/create-question&:id', function(req, res) {
	quizDbMethods.createNewQuestionRenderer(req, res, req.params.id);
});

router.get('/delete-quiz&:id', function(req, res) {
	quizDbMethods.removeQuiz(req, res, req.params.id);
});

router.post('/validate-new-quiz&title=:title', function(req, res) {
	console.log('New ajax request. POST data = '+ req.params.title);
	quizDbMethods.validateNewQuizTitle(req, res, req.params.title);
});

module.exports = router;