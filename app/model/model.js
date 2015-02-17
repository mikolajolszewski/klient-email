angular.module('emailClientApp').service('model', function($http, $rootScope, $location) {
  var inbox, outbox;

  $http.get('/emails').success(function (res) {
    inbox = res
    $rootScope.$emit('initialDataLoaded');
  });

	$http.get('/sent').success(function (res) {
    outbox = res;
	console.log(outbox);
  });

  this.getInbox = function() {
    return inbox;
  }

  this.getOutbox = function() {
    return outbox;
  }
  
  this.sendEmail = function(receivers, title, content) {
	console.log(receivers, title, content, new Date());
	var body = {"id":new Date().getTime(), "title":title, "receivers":receivers, "content":content, "sent": new Date()};
	$http.post('/sent', body).success(function (res) {
	
		$location.path("outbox");
		console.log(res);
		});
	}
		

  this.getInboxUpdate = function(lastMail) {
    var newMail = [], j = 0;
    //console.log('atstart',newMail);
    $http.get('/emails').success(function (res) {
      console.log('lastmail',lastMail);
      inbox = res;
      for (i = 0; i < inbox.length; i++) {
        if (inbox[i].received >= lastMail.received && inbox[i].id != lastMail.id) {
          newMail[j] = inbox[i];
          j++;
        }
      }
      //console.log('afterfunction',newMail);
      $rootScope.$emit('updateInbox', newMail);
    });
  }
});