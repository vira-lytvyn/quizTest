define(['can'], function(can) {
	var quizModel = can.Model.extend({
		findAll: 'GET /quizapi/getallquizes',
		findOne: 'GET /quizapi/getoneitem&{id}',
		create:  'POST /quizapi/createquiz&{id}',
		update:  'PUT /quizapi/updatequiz&{id}',
		destroy: 'DELETE /quizapi/deletequiz&{id}' 
	});

	return quizModel
});