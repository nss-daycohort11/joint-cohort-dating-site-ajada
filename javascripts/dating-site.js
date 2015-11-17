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
  ["jquery", "q", "dependencies", "eventsAPI", "main"], 
  function($, Q, _$_, eventsAPI, main) {
    
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
      var email = $('#email').val();
      var password = $('#password').val();
      console.log(email, password);
      myFirebaseRef.authWithPassword({
        email    : email,
        password : password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
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
