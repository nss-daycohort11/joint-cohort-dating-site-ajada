define(["register-user"], function(registeruser) {
	var thisUserObject = {}, genderOptions, orientationOptions, createNewAccountButton;
	
	createNewAccountButton = $("#submit-created-profile");


	// Collects Radio value from any set of radio buttons w/ same name
	function getRadioValue(name) {
	    var value;
		radios = $("input[name = " + name + "]"); 
	    
	    for (var i = 0; i < radios.length; i++) {
	        if ( radios[i].checked ) { // radio checked?
	            value = radios[i].value; // if so, hold its value in value
	            break;
	        }
	    } // closes for loop

	    return value;
	} // closes getRadioValue function

	createNewAccountButton.click(function () { // collects information and stores on thisUserObject at relevant key

		thisUserObject.username = $("#create-username-input").val();

		thisUserObject.password = $("#create-password-input").val();
		thisUserObject.age = $("#age-input").val();

		thisUserObject.firstname = $("#create-firstname").val();
		thisUserObject.lastname = $("#create-lastname").val();

		thisUserObject.gender = getRadioValue("gender");
		thisUserObject.orientation = getRadioValue("orientation");
		thisUserObject.essay = $("#essayText").val();

		thisUserObject.email = $('#create-email-input').val();

		registeruser(thisUserObject)
			.then()
			.fail(function(error) {
				console.log("error", error);
			});

		console.log("thisUserObject", thisUserObject);

	    var myFirebaseRef = new Firebase("https://ajada.firebaseio.com/");
	    myFirebaseRef.createUser({
	      email    : $('#create-email-input').val(),
	      password : thisUserObject.password
	    }, function(error, userData) {
	      if (error) {
	        console.log("Error creating user:", error);
	      } else {
	        console.log("Successfully created user account with uid:", userData.uid);
	        console.log(userData);
	      }
	    });

	});


});