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
  ["jquery", "q", "dependencies", "eventsAPI", "main", "hbs!../templates/profile"], 
  function($, Q, _$_, eventsAPI, main, profileTemplate) {
    
    var myFirebaseRef = new Firebase("https://ajada.firebaseio.com/");

    myFirebaseRef.child("Users").on("value", function(snapshot) {
      console.log(snapshot.val());  // Alerts "San Francisco"
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

    $('#login').on("click", function(){
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
          // require(['hbs!../templates/profile'], function(profileTemplate){
          //   $('#personal-info').html(profileTemplate({profile: authData.password}));
          // });
          // var f2 = new Firebase("https://ajada.firebaseio.com/userprofiles");
          // f2.child("userprofiles").on("value", function(snapshot) {
          //   console.log(snapshot.val());  // Alerts "San Francisco"
          //   var users = snapshot.val();
          // });
          $.ajax({
            url: "https://ajada.firebaseio.com/userprofiles.json",
            method: "GET"
            // data: JSON.stringify(newUser)
          })
          .done(function(users) {
            console.log(users);
            var signedInUserProfile;
            var otherUsers = [];
            for (var key in users){
              if(users[key].email === authData.password.email){
                signedInUserProfile = users[key];
              }else{
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
            require(['hbs!../templates/users'], function(usersTemplate){
              $('#people-list').html(usersTemplate({'userprofiles': otherUsers}));
            });
          });
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
