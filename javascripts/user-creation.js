define(function() {
	var thisUserObject = {}, genderOptions, orientationOptions, createNewAccountButton;
	
	createNewAccountButton = $("#submit-created-profile");

	// $("#orientation-input").click(function(e) {
	// 	selectedOrientation = e.target.firstChild.textContent;
	// 	console.log("selectedOrientation", selectedOrientation);

	genderOptions = $("#gender-options");

	createNewAccountButton.click(function () {
		orientationOptions = $("#orientation-options");

		thisUserObject.username = $("#create-username-input").val();
		thisUserObject.userPassword = $("#create-password-input").val();
		thisUserObject.userAge = $("#age-input").val();

		if (genderOptions === "male") {
			thisUserObject.userGender = "male";
		} else {
			thisUserObject.userGender = "female";
		}

		console.log("userOr", orientationOptions);
		if (orientationOptions === "straight") {
			console.log("usOer", orientationOptions);
			thisUserObject.userOrientation = "straight";
		} else if (orientationOptions === "gay") {
			console.log("usOer", orientationOptions);
			thisUserObject.userOrientation = "gay";
		} else {
			console.log("usOer", orientationOptions);
			thisUserObject.userOrientation = "bisexual";
		} 

		console.log("thisUserObject", thisUserObject);


    myFirebaseRef.createUser({
      email    : $('create-email-input').val(),
      password : thisUserObject.userPassword
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