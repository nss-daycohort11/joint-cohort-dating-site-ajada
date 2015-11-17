define(function() {
	var thisUserObject = {}, genderOptions, orientationOptions, createNewAccountButton;
	
	createNewAccountButton = $("#submit-created-profile");

	function getRadioValue(name) {
	    var value;
	    // get list of radio buttons with specified name
		radios = $("input[name = " + name + "]"); 
	    
	    // loop through list of radio buttons
	    for (var i = 0; i < radios.length; i++) {
	        if ( radios[i].checked ) { // radio checked?
	            value = radios[i].value; // if so, hold its value in value
	            break;
	        }
	    } // closes for loop
	    console.log("value", name, value);
	    return value;
	} // closes getRadioValue function



	// genderOptions = $("#gender-options");

	createNewAccountButton.click(function () {
		orientationOptions = $("#orientation-options");

		thisUserObject.username = $("#create-username-input").val();

		thisUserObject.password = $("#create-password-input").val();
		thisUserObject.age = $("#age-input").val();

		thisUserObject.gender = getRadioValue("gender");
		thisUserObject.orientation = getRadioValue("orientation");


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

		// POST TO FIREBASE API VIA AJAX
});