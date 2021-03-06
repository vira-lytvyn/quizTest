jQuery(document).ready(function($) {
	$('.question-preview').on('click', '#show', showQuiz);
	$('#upload-quiz').on('click', function(event) {
		event.preventDefault();
		$('#loaded-json').click();
	});
	$('#loaded-json').on('change', exportFromJSON);
	$('#question-content-submit').on('click', function() {
		if(validate.question() === true) {
			showQuizChoices();
			createNewChoiseField();
		} else {
			showMessage('Please first enter your question!');		
		}
	});
	$('#answer-content-submit').on('click', function() {
		if(validate.prevChoice() === true) {
			createNewChoiseField();
		} else {
			showMessage('Please fill last choise into form!');
		}
	});

	$('.form-question-content').on('click', '#save', function(event) {
		event.preventDefault();

		if(validate.radioButtons() && validate.prevChoice()) {
			saveQuestionToQuiz(createQuestionItem());
			clearQuestionForm();
		} else {
			showMessage('Please choose correct answer, or delete empty field!');
		}
	});

	$('.delete-choice').on('click', deleteChoice);
});

/*
* Andy's code
*/
function showQuizChoices() {
	$('.answers').addClass('active');
}

function showMessage(message) {
	$('.status-message').text(message);
	setTimeout(hideMessage, 4000);
}
function hideMessage() {
	$('.status-message').text('');
}

function createNewChoiseField() {
	var container, textInput, radioInput, deleteButton;

	textInput = new TextInput();
	radioInput = new RadioInput();
	deleteButton = new DeleteButton();

	container = $('<li>').append(textInput, radioInput, deleteButton);

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

		return input
	}
}
function TextInput() {
	return this.init('text', 'answer-content');
}
TextInput.prototype = new Input();

function RadioInput() {
	var label = $('<label>').text('')
		.append(this.init('radio', 'correct-answer'));

	return label
}
RadioInput.prototype = new Input();

function DeleteButton() {
	var link = $('<a>').text('X')
		.attr('href', '#')
		.addClass('delete-choice')
		.click(deleteChoice);

	return link
}

// function for generation question object

function createQuestionItem () {
    var question = {};

    question.title = $('.question-content').val();
    question.choices = [];
    var answers = $('.answer-content');
    $.each(answers, function(index, answer) {
    	question.choices.push($(answer).val());
    	if ($(answer).parent().find('.correct-answer').is(':checked')) {
    		question.correctAnswer = index;
    	}         
    });

    console.log(question);

    return question;
}

function Validate() {
	this.question = function() {
		if($('#question-content').val()) {
			return true			
		} else {
			return false
		}
	}

	this.radioButtons = function() {
		var checkbox = $(".answers input:radio:checked");
		if(checkbox.length > 0) {
			return true
		} else {
			return false
		}
	}

	this.prevChoice = function() {
		var element = $('.answers-container li:last-child .answer-content');
 		if(!element.val()) {
			return false
		} else {
			return true
		}
	}
}
var validate = new Validate();

function clearQuestionForm() {
	$('.answers').removeClass('active');
	$('.answers-container li').slice(1).remove();
	$('.correct-answer').prop('checked', false);
	$('.answer-content').val('');
	$('#question-content').val('');
}

function deleteChoice() {
	var choiceContainer = $(this).closest('li');
	if(choiceContainer.parent().children().length > 1) {
		choiceContainer.remove();
	} else {
		showMessage('You may have more then one choice to delete.')
	}
}