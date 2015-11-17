define(["q"], function(Q) {

	return function(newUser) {
		var deferred = Q.defer();

		$.ajax({
			url: "https://ajada.firebaseio.com/userprofiles.json",
			method: "POST",
			data: JSON.stringify(newUser)
		})
		.done(function(newUser) {
			deferred.resolve(newUser);
			console.log("successful new user", newUser);
		})
		.fail(function(error) {
			deferred.reject(error);
			console.log("oh no! post failed");
		});
		return deferred.promise;
	};


});