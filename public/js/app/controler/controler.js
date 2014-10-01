define(['can', 'model/model'], function(can, quizModel) {
	var QuizesList = can.Control.extend({
		"init": function(element, option) {
			quizModel.findAll({}, function(quiz){
				var template = can.view('templates/index', {title: 'Quizzy', quizData: quiz});
				$('.container').html(template);
				console.log($('li'));
			}, function(err){
				console.log(err);
			});
		},

		".quiz-list-item click": function(li, event) {
			li.toggleClass('active');
		},

		".quiz-list-item>a click": function(a, event) {
			event.preventDefault();
		},

		"#create-quiz-home-button click": function(li, event) {
			$('.wrapper-home').hide();
			new CreateQuiz('body');
		}
	});

	new QuizesList('body');

	var CreateQuiz = can.Control.extend({
		defaults: { view: 'templates/create-quiz', validForm: false },
	}, {
		"init": function(element, option) {
			var template = can.view('templates/create-quiz', {title: 'Create quiz'});
			$('.container').append(template);
		},
		
		".new-quiz-title blur": function(el, event) {
			var title = el.val(),
					validationValue;

			$.ajax({
				method: 'POST',
				url: '/validate-new-quiz&title=' + title
			}).done(function(msg) {
				if(msg) {
					$('.mail-box').removeClass('invalid').addClass('valid').text('Title is valid!');
					validationValue= true;
				} else {
					$('.mail-box').removeClass('valid').addClass('invalid').text('There are quiz with this title!');
					validationValue = false;
				}
			});

			this.validForm = validationValue;
			console.log(this.validForm);
		},
		".create-quiz-sublim-button click": function(el, event) {
			console.log(this.validForm);
		}
	});
});