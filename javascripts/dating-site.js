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
    /*
      You can choose to use the REST methods to interact with
      Firebase, or you can use the Firebase API with event
      listeners. It's completely up to each team.

      If you choose the former, I created two boilerplate modules
      named `potential-mates.js`, and `add-favorite.js`.
     */
    
  }
);
