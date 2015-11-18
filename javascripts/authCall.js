define(["q"], function(Q) {

	return {


		authenticate: function(email, password, myFirebaseRef) {

			var deferred = Q.defer();

			myFirebaseRef.authWithPassword({
		        email    : email,
		        password : password
		      }, function(error, authData) {
		        if (error) {
		          console.log("Login Failed!", error);
		        } else { deferred.resolve(authData); }
		    });
		    return deferred.promise;
		}
	};
});