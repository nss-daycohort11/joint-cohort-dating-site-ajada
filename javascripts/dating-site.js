require.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'q': '../lib/bower_components/q/q',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../lib/bower_components/firebase/firebase'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

require(
  ["dependencies", "eventsAPI"], 
  function(_$_, eventsAPI) {
    
    var myFirebaseRef = new Firebase("https://ajada.firebaseio.com/");
    
    myFirebaseRef.child("Users").on("value", function(snapshot) {
      console.log(snapshot.val());  // Alerts "San Francisco"
    });

    var promise = eventsAPI();
    promise.then(function(data){
      console.log(data);
    });

    var signup = false;
    $('#signupButton').on("click", function(){
      signup = true;
      console.log(signup);
    });

    $('#login').on("click", function(){
      console.log("click");
      var email = $('#email');
      var password = $('#password');
      if(signup){
        //login
        myFirebaseRef.createUser({
          email    : email.val(),
          password : password.val()
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            console.log(userData);
          }
        });
      }else{
        //signup
        myFirebaseRef.authWithPassword({
          email    : email.val(),
          password : password.val()
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
      }
    });
    
    $(".page").hide();
    $("#entry-screen").show();
    
    $(".page-turn").click(function(e) {
      var nextPage = $(this).attr("next");

      $(".page").hide();
      $("." + nextPage).show();

    });


    /*
      You can choose to use the REST methods to interact with
      Firebase, or you can use the Firebase API with event
      listeners. It's completely up to each team.

      If you choose the former, I created two boilerplate modules
      named `potential-mates.js`, and `add-favorite.js`.
     */
    
  }
);
