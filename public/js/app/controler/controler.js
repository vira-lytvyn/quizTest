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

		"li click": function(li, event) {
			console.log('Click');
			li.trigger( 'selected' );
		},

		"#create-quiz-home-button click": function(li, event) {
			alert('click');
		}
	});

	new QuizesList('body');

	var CreateQuiz = can.Control.extend({
		defaults: { view: 'templates/create-quiz' },
	}, {
		"init": function(element, option) {
			var template = can.view('templates/create-quiz');
			$('body').html(template);
		}
	});
	// setTimeout(function() {
	// 	new CreateQuiz();
	// }, 5000);
});