define(['can', 'model/model'], function(can, quizModel) {
	var QuizesList = can.Control.extend({
		'init': function(element, option) {
			quizModel.findAll({}, function(quiz){
				var template = can.view('templates/index', {title: 'Quizzy', quizData: quiz});
				$('.container').append(template);
			}, function(err){
				console.log(err);
			});
		},

		'.quiz-list-item click': function(el, evt) {
			el.toggleClass('active');
		},

		'.quiz-list-controllers>a click': function(el, evt) {
			evt.preventDefault();
		},

		'.delete-quiz-button click': function(el, evt) {
			quizModel.destroy(el.data('id')).done(function(res) {
				if(res) {
					el.parents('.quiz-list-item').remove();
				} else {
					console.log('error');
				}
			});
		},

		'#create-quiz-home-button click': function(li, event) {
			$('.container .active-section').removeClass('active-section');
			new CreateQuiz('.container');
		}
	});

	new QuizesList('body');

	var CreateQuiz = can.Control.extend({
		'init': function(element, option) {
			var template = can.view('templates/create-quiz', {title: 'Create quiz'});
			$('.container').append(template);
		},
		
		'.new-quiz-title blur': function(el, evt) {
			evt.preventDefault();
			var title = el.val(),
					validationValue;

			quizModel.validate(title)
				.done(function(res) {
					if(res) {
						$('.mail-box').removeClass('invalid').addClass('valid').text('Title is valid!');
						validationValue= true;
					} else {
						$('.mail-box').removeClass('valid').addClass('invalid').text('There are quiz with this title!');
						validationValue = false;
					}
				});

		},
		'.create-quiz-sublim-button click': function(el, event) {
			var title = el.find('.new-quiz-title').val();
			quizModel.validate(title).done(function(res) {
				if(res) {
					quizModel.createQuiz($('.new-quiz-title').val(), $('.new-quiz-description').val())
						.done(function(res) {
							if(res) {
								console.log(title);
								$('.container .active-section').removeClass('active-section');
								new NewQuestion(['.container', $('.new-quiz-title').val()]);
							}
						});
				}
			});
		}
	});

	var NewQuestion = can.Control.extend({
		'init':function(el, option) {
			var template = can.view('templates/create-question');
			console.log(el);
			//el.append(template);
		}
	});
});