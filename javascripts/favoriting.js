define(function() {

$("body").click(function(e) {
	var locationInDom = e.target.parentElement.id;

	if (locationInDom === "match-info") {
		var favoritedPerson = e.toElement.id;
		console.log("hello, there, e", favoritedPerson);
	}
});




});