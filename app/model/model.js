angular.module('emailClientApp').service('model', function($http, $rootScope) {
  var inbox, outbox;

  $http.get('/emails').success(function (res) {
    inbox = res
    $rootScope.$emit('initialDataLoaded');
  });

	$http.get('/sent').success(function (res) {
    outbox = res;
  });

  this.getInbox = function() {
    return inbox;
  }

  this.getOutbox = function() {
    return outbox;
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