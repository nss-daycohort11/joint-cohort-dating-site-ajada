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
  ["jquery", "q", "dependencies", "eventsAPI", "main", "hbs!../templates/profile", "populate-profile", "return-users", "authCall"], 
  function($, Q, _$_, eventsAPI, main, profileTemplate, populateUserToProfile, returnusers, authCall) {
    
    var myFirebaseRef = new Firebase("https://ajada.firebaseio.com/");

    myFirebaseRef.child("Users").on("value", function(snapshot) {

    });

    var promise = eventsAPI();
    promise.then(function(data){
      require(['hbs!../templates/events'], function(eventsTemplate){
        $('#event-list').html(eventsTemplate({events: data.activities}));
      });
    });

    var signup = false;
    $('#signupButton').on("click", function(){
      signup = true;
      console.log(signup);
    });

    /*jshint esnext: true */

    // User authentication, private process w/ Firebase
    $('#login').on("click", function(){
      var email = $('#email').val();
      var password = $('#password').val();
      var auth;

      authCall.authenticate(email, password, myFirebaseRef) 
        // Send email and password for login authentication
        .then(function(authData) {
          auth = authData;
          return returnusers.retrieveUsers();
        })
        // Gets the list of users once ajax call complete
        .then(function(userLibrary) {
          // On sign in, populates user profile and all dating site users. 
          populateUserToProfile.populateProfile(auth, userLibrary);
        })
        .fail(function(error) {
          console.log("error", error);
        });

    });

  
    
    $(".page").hide();
    $("#entry-screen").show();
    
    $(".page-turn").click(function(e) {
      var nextPage = $(this).attr("next");

      $(".page").hide();
      $("." + nextPage).show();

    });

    
  }
);
