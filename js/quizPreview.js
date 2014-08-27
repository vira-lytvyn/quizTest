function generateQuiz (quiz) {
	var form = '<form class="quiz-form" id="quizForm">';
	for (var i = 0, len = quiz.length; i < len; i++) {
		form += generateQuestion(quiz[i], i);
	};		
	form += '</form>';

	var quizPreview = window.open('');
	var content = ''+
	'<html>'+
	'	<head>'+
	'		<meta charset="UTF-8">'+
	'		<title>Test quiz</title>'+
	'		<link rel="stylesheet" href="css/quizStyle.css">'+
	'	</head>'+
	'	<body>'+
	'		<h1 class="quiz-title">Test quiz</h1>'+ form +
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
