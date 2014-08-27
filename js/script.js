var quiz = {
	quizTitle: "This is test quiz. Just join and have fun =)",
	questions: [
		{
			title: "Who is Prime Minister of the United Kingdom?", 
			choices: [
				"David Cameron", 
				"Gordon Brown", 
				"Winston Churchill", 
				"Tony Blair"
			], 
			correctAnswer: 0
		},
		{
			title: "Who is the President of USA?", 
			choices: [
				"David Cameron", 
				"Barac Obama"
			], 
			correctAnswer: 2
		},
		{
			title: "Who is Yanukovich?", 
			choices: [
				"president", 
				"businessman", 
				"man", 
				"difficult to find an answer",
				"an idiot"
			], 
			correctAnswer: 3
		}
	]
};

jQuery(document).ready(function($) {
	$('.question-preview').on('click', '#show', generateQuiz);
	$('#question-content-submit').on('click', showQuizChoices);
	$('#answer-content-submit').on('click', createNewChoiseField);

	$('.form-question-content').on('click', '#save', function(event) {
		event.preventDefault();
		saveQuestion();
	});
});

function generateQuiz () {
	console.log('test');

	var form = '<form class="quiz-form" id="quizForm">';
	for (var i = 0, len = quiz.questions.length; i < len; i++) {
		form += generateQuestion(quiz.questions[i], i);
	};		
	form += '</form>';

	var quizPreview = window.open('');
	var content = ''+
	'<html>'+
	'	<head>'+
	'		<meta charset="UTF-8">'+
	'		<title>'+ quiz.quizTitle +'</title>'+
	'		<link rel="stylesheet" href="css/quizStyle.css">'+
	'	</head>'+
	'	<body>'+
	'		<h1 class="quiz-title">' + quiz.quizTitle + '</h1>'+ form +
	'	</body>'+
	'</html>';

	quizPreview.document.write(content);
}

function generateQuestion(question, number) {

	var choices = '';

	for (var i = 0, len = question.choices.length; i < len; i++) {
		choices += ''+
		'<li class="question-choice">'+
		'	<label class="choice-item">'+
		'		<input type="radio" name="question-'+ number +'">'+	question.choices[i] +
		'	</label>'+
		'</li>';
	}

	var item = ''+
	'<div class="question-item">'+
	'	<h3 class="question-text">'+ question.title +'</h3>'+
	'	<ul class="question-choices">' + choices + '</ul>'+
	'</div>';

	return item;
}

/*
* Andy's code
*/
function showQuizChoices() {
	if ($(this).prev().val() !== '') {
		$('.answers').addClass('active');
	} else {
		alert('Please input question text!');
	}
}

function createNewChoiseField() {
	var container, textInput, radioInput;

	textInput = new TextInput();
	radioInput = new RadioInput();

	container = $('<li>').append(textInput, radioInput);

	$('.answers-container').append(container);
}

function Input() {
	var input;
	this.init = function(inputType, inputName) {
		input = $('<input>').attr({
			type: inputType,
			name: inputName
		});

		return input;
	}
}
	function TextInput() {
		return this.init('text', 'question-text');
	}
	TextInput.prototype = new Input();

	function RadioInput() {
		var label = $('<label>').text(' Check if this answer is correct ')
			.append(this.init('radio', 'correct-answer'));

		return label;
	}
	RadioInput.prototype = new Input();