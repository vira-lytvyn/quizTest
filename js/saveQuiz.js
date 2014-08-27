function doesQuizExist() {
    return localStorage.getItem('quizQuestions') !== null;
}

function saveQuestion (question) {
    var savedQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
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
                localStorage.removeItem('quizQuestions');
                return false;
            } 
        } else {
            savedQuestions.push(question);
            localStorage.setItem('quizQuestions', JSON.stringify(savedQuestions));
            alert('Question was successfully saved. You can view it in your localStorage.');
            return true;
        }
    } catch(e) {
        alert('Sorry, there were some errors with saving this question to your localStorage');
        return false;
    }
}

function getQuestions () {
    if (doesQuizExist()) {
        var questions = JSON.parse(localStorage.getItem('quizQuestions'));
        generateQuiz(questions);
    } else {
        alert('Sorry, you\'ve saved no one question for your quiz.');
    }
}

function exportFromLocalStorageToJSON (questions) {
    console.log(questions);
}
