define(["q"], function(Q) {

	return function(newUser) {
		var deferred = Q.defer();


// -k234w: {userobject}


		$.ajax({
			url: "ajada/userprofiles",
			method: "POST",
			data: JSON.stringify(newUser)
		})
		.done(function(newUser) {
			deferred.resolve(newUser);
			console.log("successful new user", newUser);
		})
		.fail(function(error) {
			deferred.reject(error);
			console.log("oh no!");
		})
		return deferred.promise;
	};


});