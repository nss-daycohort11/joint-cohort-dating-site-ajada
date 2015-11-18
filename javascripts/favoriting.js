define(function() {

$("body").click(function(e) {
	if ($("#matchinfo")) {
		var favoritedPerson = e.toElement.id;
		console.log("hello, there, e", favoritedPerson);
	}
});




});