define(["q", "jquery", "return-users"], function(Q, $, returnuser) {

	return {

		/*jshint esnext: true */

		populateProfile: function(authData, users) {

	        var signedInUserProfile;
	        var otherUsers = {};
	        for (var key in users) {
	          if(users[key].email === authData.password.email){
	            signedInUserProfile = users[key];
	          } else {
	          	// Stores matches on a modified object of objects retaining their UID stored in key
	            otherUsers[key] = users[key];
	          }
	        }

	        require(['hbs!../templates/profile'], function(profileTemplate){

	        	// Populates person who is logged in to the DOM

	          	$('#profile-content').html(profileTemplate(signedInUserProfile));
	        });
	        require(['hbs!../templates/users'], function(usersTemplate) {
	        	// Populates all others to the DOM as Matches // half function
	          $('#people-list').html(usersTemplate({'userprofiles': otherUsers}));
	        });
        }

	};
});