function doesQuizExist(name) {
    return localStorage.getItem(name) !== null;
}

function saveQuestionToQuiz (question, quiz) {
    var test = quiz || $('#quiz-title').val();
    var savedQuestions = JSON.parse(localStorage.getItem(test)) || [];
    try {
        if (savedQuestions.indexOf(question) !== -1) {
            if (confirm('Such question is already saved. \nWould you like to edit it?')) {
                console.log(question);
            }
            return false;
        } else if (savedQuestions.length >= 100){
            alert('Sorry, you can save only 100 questions. Limit expires. \nYou should clear your localStorage to save new questions.');
            if (confirm('Would you like to delete all saved questions now?')) {
                localStorage.removeItem('quizQuestions');
                return false;
            } else if (confirm('Would you like to export all saved questions to JSON file and then remove them?')) {
                exportFromLocalStorageToJSON(savedQuestions);
                localStorage.removeItem(test);
                return false;
            } 
        } else {
            savedQuestions.push(question);
            localStorage.setItem(test, JSON.stringify(savedQuestions));
            alert('Question was successfully saved. You can view it in your localStorage.');
            return true;
        }
    } catch(e) {
        alert('Sorry, there were some errors with saving this question to your localStorage');
        return false;
    }
}

function getQuiz () {
    var name = $('#quiz-title').val();
    if (doesQuizExist(name)) {
        var questions = JSON.parse(localStorage.getItem(name));
        generateQuiz(name, questions);
    } else {
        alert('Sorry, you\'ve saved no one question for your quiz.');
    }
}
