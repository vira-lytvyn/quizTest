var allQuestions = [
	{
		question: "Who is Prime Minister of the United Kingdom?", 
		choices: [
			"David Cameron", 
			"Gordon Brown", 
			"Winston Churchill", 
			"Tony Blair"
		], 
		correctAnswer: 0
	},
	{
		question: "Who is the President of USA?", 
		choices: [
			"David Cameron", 
			"Barac Obama"
		], 
		correctAnswer: 2
	},
	{
		question: "Who is Yanukovich?", 
		choices: [
			"president", 
			"businessman", 
			"man", 
			"difficult to find an answer",
			"an idiot"
		], 
		correctAnswer: 3
	}
];

function generateQuestionItem (itemQ, number) {

	var item = document.createElement('form');
	item.class = 'question-item q-'+number;

	var text = document.createElement('p');
	text.class = 'question-text';
	text.innerHTML = itemQ.question;

	var choices = document.createElement('p');
	choices.setAttribute('class', 'answer-block');

	for (var i = 0; i < itemQ.choices.length; i++) {

		var answer = document.createElement('label');
		answer.class = 'answer';
		answer.innerHTML = itemQ.choices[i];

		var choice = document.createElement('input');
		choice.setAttribute('type', 'radio');
		choice.setAttribute('name', 'q-' + number);	

		answer.appendChild(choice);
		choices.appendChild(answer);
	};

	item.appendChild(text).appendChild(choices);
}

function showNext () {
	var container = document.getElementById('quiz_questions');
	var active = +document.getElementById('question_id');

	container.style.display = none;

	container.
	console.log("test");
}

function increaseScore(){
	var score = document.getElementById('total_score');
	score.value = +score.value + 1;
}