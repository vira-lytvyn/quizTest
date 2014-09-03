function exportFromJSON () {
	var path = $(this).val();
	var filemane = path.indexOf('\\') ? path.split('\\').pop() : path.split('/').pop() ;
	console.log(filemane);
	// var file = this.files[0];

	// var blob = new Blob([file], {type: "application/json"});
	// saveAs(blob, "/user_quizes/" + filemane);

	$.getJSON("./user_quizes/"+filemane, function(json) {
	    console.log(json); 
	    generateQuiz(filemane.split('.')[0], json);
	});    
}