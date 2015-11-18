define(["q", "jquery", "return-users"], function(Q, $, returnuser) {

	return {

		/*jshint esnext: true */

		populateProfile: function(authData, users) {
			console.log(users);
	        var signedInUserProfile;
	        var otherUsers = [];
	        for (var key in users) {
	          if(users[key].email === authData.password.email){
	            signedInUserProfile = users[key];
	          } else {
	            otherUsers.push(users[key]);
	          }
	        }
	        console.log("signedInUserProfile", signedInUserProfile);
	        console.log("otherUsers", otherUsers);
	        require(['hbs!../templates/profile'], function(profileTemplate){
	          	var justThisObject = {"userprofiles":{ "userprofiles": {signedInUserProfile} } };
	          	console.log("justThisObject", justThisObject);
	          	$('#profile-content').html(profileTemplate(signedInUserProfile));
	        });
	        require(['hbs!../templates/users'], function(usersTemplate) {
	          $('#people-list').html(usersTemplate({'userprofiles': otherUsers}));
	        });
        }

	};
});


/*returnuser.retrieveUsers()
          .then (function(users) {
            console.log("Log users", users);
            populate.populateProfile(users);
          })
          .fail (function(error) {
            console.log("ERROR, muthafucka", error);
          });*/