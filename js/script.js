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
		correctAnswer: 1
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
	item.setAttribute('class', 'question-item q-' + number);

	var text = document.createElement('p');
	text.setAttribute('class', 'question-text');
	text.innerHTML = itemQ.question;

	var choices = document.createElement('p');
	choices.setAttribute('class', 'answer-block');

	for (var i = 0; i < itemQ.choices.length; i++) {

		var answer = document.createElement('label');
		answer.setAttribute('class', 'answer');
		answer.innerHTML = itemQ.choices[i];

		var choice = document.createElement('input');
		choice.setAttribute('type', 'radio');
		choice.setAttribute('name', 'q-' + number);	
		choice.setAttribute('value', i);	

		answer.insertBefore(choice, answer.firstChild);
		choices.appendChild(answer);
	};

	item.appendChild(text);
	item.appendChild(choices);

	correct.setAttribute('value', itemQ.correctAnswer);

	return item;
}


var container = document.getElementById('quiz_questions');
var active = document.getElementById('question_id'); 
var correct = document.getElementById('correct_number');

function showNext () {	
	var currentQuestion = +active.value;

	if (document.querySelector('input:checked').getAttribute('value') == correct.getAttribute('value')) {
		increaseScore();
	}

	if (currentQuestion === allQuestions.length) {
		showFinalScore();
		return;
	}

	container.style.display = 'none';
	container.removeChild(document.querySelector('.q-' + currentQuestion));
	container.appendChild(generateQuestionItem(allQuestions[currentQuestion], currentQuestion+1));
	
	active.setAttribute('value', currentQuestion+1);
	container.style.display = 'block';
}

function increaseScore(){
	var score = document.getElementById('total_score');
	console.log(score);
	console.log(score.textContent);
	score.innerHTML = +score.textContent + 1;
}

function showFinalScore(){
	var congrats = document.createElement('div');
	congrats.setAttribute('class', 'congratulations-block');
	var message = document.createElement('p');
	message.innerHTML = 'Congratulations! Your score is '

	var score = document.createElement('b');
	score.innerHTML = document.getElementById('total_score').textContent;

	message.appendChild(score);
	congrats.appendChild(message);
	container.appendChild(congrats);

	container.removeChild(document.querySelector('.q-' + active.value));
	document.querySelector('.user-score').style.display = 'none';
	document.querySelector('.btn-next').style.display = 'none';
}