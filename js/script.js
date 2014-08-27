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
	$('#answer-content-submit').on('click', function() {
		if(validate.prevChoice() === true) {
			createNewChoiseField();
		} else {
			showMessage('Please fill last choise into form!');
		}
	});

	$('.form-question-content').on('click', '#save', function(event) {
		event.preventDefault();
		//saveQuestion(createQuestionItem());
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
	if(validate.question() === true) {
		$('.answers').addClass('active');
	} else {
		showMessage('Please first enter your question!');		
	}
}

function showMessage(message) {
	$('.status-message').text(message);
}

function createNewChoiseField() {
	var container, textInput, radioInput;

	textInput = new TextInput();
	radioInput = new RadioInput();

	container = $('<li>').append(textInput, radioInput);

	$('.answers-container').append(container);
	$('input[name="question-text"]').addClass("answer-content");
}

function Input() {
	var input;
	this.init = function(inputType, inputClass) {
		input = $('<input>').attr({
			type: inputType,
			class: inputClass
		});

		return input;
	}
}
function TextInput() {
	return this.init('text', 'answer-content');
}
TextInput.prototype = new Input();

function RadioInput() {
	var label = $('<label>').text(' Check if this answer is correct ')
		.append(this.init('radio', 'correct-answer'));

	return label;
}
RadioInput.prototype = new Input();


// function for generation question object

function createQuestionItem () {
    var question = {};

    question.title = $('.question-content').val();
    var choices = $('.answer-content');
    console.log(choices);
    $.each(choices, function(index, choice) {
    	question.choices.push($(choice).val());
    	console.log($(choice).find('.correct-answer').checked);
    	if ($(choice).find('.correct-answer').checked) {
    		question.correctAnswer = index;
    	}         
    });

    return question;
}

function Validate() {
	this.question = function () {
		if($('#question-content').val() !== '') {
			return true			
		} else {
			return false
		}
	}

	this.radioButtons = function () {
		var checkbox = $(".answers input:radio:checked");
		if(checkbox.length > 0) {
			return true
		} else {
			return false
		}
	}

	this.prevChoice = function () {
		var element = $('.answers-container li:last-child .answer-content');
 		if(element.val() == '') {
			return false
		} else {
			return true
		}
	}
}
var validate = new Validate();
