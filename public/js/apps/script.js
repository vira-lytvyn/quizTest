$(document).ready(function() {
	$('.quiz-list-item').on('click', function() {
		$(this).toggleClass('active');
	});

	$('.question-input-text').on("keypress", function() {
		$('.hide-part-question-editor').show();
	});

	$('.createQuizValidation').on('click', function() {
		var title = $('.newQuizTitle').val();
		
		if(title) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST", "/validateNewQuiz&" + title, false);
			xmlhttp.send();
			var result = $.parseJSON(xmlhttp.responseText);
			if(result == true) {
				$('.new-quiz-form').submit();
			} else {
				var mail = $('<span>').text('Quiz with this title already exist, please enter enother title!').addClass('mail-item');
				$('.mail-box').append(mail);
			}
		}
		
	});
});

	function createNewChoiseField() {
		var container, textInput, radioInput, deleteButton;

		textInput = new TextInput();
		radioInput = new RadioInput();
		deleteButton = new DeleteButton();

		container = $('<li>').append(textInput, radioInput, deleteButton);

		$('.choices-container').append(container);
	}

	function Input() {
		var input;
		this.init = function(inputType, inputName, inputClass) {
			input = $('<input>').attr({
				type: inputType,
				name: inputName,
				class: inputClass
			});

			return input
		}
	}
	function TextInput() {
		var label = $('<label>').append(this.init('text', '', 'answer-content'));

		return label
	}
	TextInput.prototype = new Input();

	function RadioInput() {
		return this.init('radio', 'correct-answer', 'correct-answer')
	}
	RadioInput.prototype = new Input();

	function DeleteButton() {
		var link = $('<a>').text('X')
			.attr('href', '#')
			.addClass('delete-choice')
			.click(deleteChoice);

		return link
	}

	function deleteChoice() {
		var choiceContainer = $(this).closest('li');
		if(choiceContainer.parent().children().length > 1) {
			choiceContainer.remove();
		} else {
			showMessage('You may have more then one choice to delete.')
		}
	}