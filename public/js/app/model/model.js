define(['can', 'jquery'], function(can, $) {
	return can.Model.extend({
		findAll: 'GET /quizapi/find-all-quizes',
		findOne: 'GET /quizapi/find-one-quiz&{id}',
		createQuiz:  function(title, description) {
			return $.ajax({
				url: '/quizapi/create-new-quiz-post',
				type: 'POST',
				data: {title: title, description: description}
			});
		},
		update:  'PUT /quizapi/update-quiz&{id}',
		destroy: function(id) {
			return $.ajax({
				url: '/quizapi/delete-quiz',
				type: 'DELETE',
				data: {id: id}
			});
		},
		validate: function(title) {
			return $.ajax({
				url: '/validate-new-quiz',
				type: 'POST',
				data: {title: title},
			});
		}
	}, {});
});