$('#edit-ability').on('click', function() {
	if (this.value == "Edit ability: off") {
		$('.edit-choice, .edit-question, .delete-choice, .delete-question').css("display", "inline");
		this.value = "Edit ability: on"; 
	} else {
		this.value = "Edit ability: off";
		$('.edit-choice, .edit-question, .delete-choice, .delete-question').css("display", "none");
	}
})