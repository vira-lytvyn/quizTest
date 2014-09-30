var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quizdb');
var formidable = require('formidable');

var quizSchema = mongoose.Schema({
	title: { type: String, unique: true },
	description: String,
	questions: []
});
Quiz = mongoose.model('Quiz', quizSchema);

exports.createNewQuiz = function(req, res, quizTitle, quizDescription) {
	var newQuiz = new Quiz({
		title : quizTitle,
		description: quizDescription
	});

	var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./img/quizLogo";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        console.log("form.bytesReceived");
        //TESTING
        console.log("file size: "+JSON.stringify(files.fileUploaded.size));
        console.log("file path: "+JSON.stringify(files.fileUploaded.path));
        console.log("file name: "+JSON.stringify(files.fileUploaded.name));
        console.log("file type: "+JSON.stringify(files.fileUploaded.type));
        console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
        fs.rename(files.fileUploaded.path, './img/quizLogo'+files.fileUploaded.name, function(err) {
        if (err)
            throw err;
          console.log('renamed complete');  
        });
          res.end();
    });

	Quiz.find({title: quizTitle}, function(err, docs) {
		if (docs.length)	{
			res.send('Quiz with this title already exist. Please go back and enter enother title!');
		} else {
			newQuiz.save(function (err, newQuiz) {
				if (err) throw err;
				res.location('/create-question&' + newQuiz._id);
				res.redirect('/create-question&' + newQuiz._id);
			});
		}
	});
}

exports.createNewQuestion = function(req, res, id) {
	Quiz.findById(id, function(err, docs) {
		if(err) throw err
		
	});
}

exports.getAllQuizes = function(req, res) {
	Quiz.find(function(err, docs) {
		if(err) throw err
		res.send(docs);
	});
}

exports.createNewQuestionRenderer = function(req, res, id) {
	Quiz.findById(id, function(err, docs) {
		if(err) throw err
		res.render('create-question', { title: 'Create question for the "' + docs.title + '"'});		
	});
}

exports.removeQuiz = function(req, res, id) {
	Quiz.remove({ _id : id}, function(err) {
		if(err) throw err
		console.log('Item with id:' + id + 'was removed');
		res.location('/');
		res.redirect('/');
	});
}

exports.validateNewQuizTitle = function(req, res, newQuizTitle) {
	Quiz.find({title: newQuizTitle}, function(err, docs) {
		if (docs.length) {
			res.send(false);
		} else {
			res.send(true);
		}
	});
}