var express = require('express');
var router = express.Router();
var quizDbMethods = require('../quizDb');


router.get('/quizapi/find-all-quizes', function(req, res) {
	quizDbMethods.getAllQuizes(req, res);
});

router.post('/quizapi/create-new-quiz-post', function(req, res) {
	quizDbMethods.createNewQuiz(req, res);
});

router.get('/quizapi/create-question', function(req, res) {
	quizDbMethods.createNewQuestionRenderer(req, res, req.params.id);
});

router.delete('/quizapi/delete-quiz', function(req, res) {
	quizDbMethods.removeQuiz(req, res);
});

router.post('/validate-new-quiz', function(req, res) {
	console.log('New ajax request. POST');
	quizDbMethods.validateNewQuizTitle(req, res);
});

module.exports = router;