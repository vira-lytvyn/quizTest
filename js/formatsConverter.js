function exportFromJSON () {
	var file = this.files[0];
	console.log('test');
	console.log(file);
	console.log(file.name);

	if (!file.type.match('/*.json/')) {
      continue;
    }
    console.log($.parseJSON(file));
    var reader = new FileReader();
    reader.onload = generateQuiz(file.name, $.parseJSON(file));
    reader.readAsDataURL(file);
}