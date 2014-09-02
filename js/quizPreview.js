function generateQuiz (quiz, questions) {
	var form = '<form class="quiz-form" id="quizForm">';
	for (var i = 0, len = questions.length; i < len; i++) {
		form += generateQuestion(questions[i], i);
	};		
	form += '</form>';

	var json = JSON.stringify(questions);
	var blob = new Blob([json], {type: "application/json"});
	var url  = URL.createObjectURL(blob);

	var quizPreview = window.open('');
	var content = ''+
	'<html>'+
	'	<head>'+
	'		<meta charset="UTF-8">'+
	'		<title>'+ quiz +'</title>'+
	'		<link rel="stylesheet" href="css/quizStyle.css">'+	
	'		<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>' +
	' 		<script src="js/script.js"></script>' +
	' 		<script src="js/editAbility.js"></script>' +
	' 		<script src="js/formatsConverter.js"></script>' +
	'	</head>'+
	'	<body>'+
	'		<h1 class="quiz-title">'+ quiz +'z</h1>'+
	'		<input type="button" value="Edit ability: off" id="edit-ability" class="admin-buttons">' +
	'		<a class="admin-buttons" id="download" download="'+ quiz + '.json' +'" href="'+ url +'">Download JSON</a>' + form +
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
		'		<input type="button" value="Edit" id="edit-choice" class="edit-choice">' +
		'		<input type="button" value="Delete" id="delete-choice" class="delete-choice">' +
		'		<input type="radio" name="question-'+ number +'">'+	question.choices[i] +
		'	</label>'+ 
		'</li>';
	}
	var item = ''+
	'<div class="question-item">'+
	'	<h3 class="question-text">'+ question.title +'</h3>'+ 
	'	<input type="button" value="Edit" id="edit-question" class="edit-question">' +
	'	<input type="button" value="Delete" id="delete-question" class="delete-question">' +
	'	<ul class="question-choices">' + choices + '</ul>'+
	'</div>';
	return item;
}
