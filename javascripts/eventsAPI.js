define(function(require){
  var $ = require("jquery");
  var Q = require("q");
  
  return function(URL){
    var deferred = Q.defer();
    
    $.ajax({
      url: "http://terminal2.expedia.com/x/activities/search?location=Nashville&apikey=OsYfTWKk54EN1WPHxLeAQQu4IZXC5Hwg",
      method: "GET"

      }).done(function(data) {
        console.log(data);
        deferred.resolve(data);
    });
    return deferred.promise;
  };
});