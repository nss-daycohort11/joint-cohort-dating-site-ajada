define(["q", "jquery"], function(Q, $) {

	var appUsers;

	return {

		/*jshint esnext: true */

		retrieveUsers: function() {
			var deferred = Q.defer();

			$.ajax({
	            url: "https://ajada.firebaseio.com/userprofiles.json",
	            method: "GET"
	            // data: JSON.stringify(newUser)
	        })
	        .done(function(users) {
	        	/*appUsers = users;*/
	        	console.log(users);
	        	deferred.resolve(users);
	        })
	        .fail(function(error) {
	        	deferred.reject(error);
	        	console.log("FAIL", error);
	        });
	        return deferred.promise;
	    }
/*	    getUsers: function() {
	    	console.log("appUsers", appUsers);
	    	return appUsers;
	    }*/
	};
});

