define(function(require, date){
  var $ = require("jquery");
  var Q = require("q");
  
  return function(URL){
    var deferred = Q.defer();
    
    $.ajax({
        url: "http://terminal2.expedia.com/x/activities/search?location=Nashville&startDate=2015-11-16&endDate=2015-11-18&apikey=OsYfTWKk54EN1WPHxLeAQQu4IZXC5Hwg",
        method: "GET"
      }).done(function(data) {
        deferred.resolve(data);
    });
    return deferred.promise;
  };
});