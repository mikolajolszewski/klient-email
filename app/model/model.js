angular.module('emailClientApp').service('model', function($http, $rootScope) {
  var inbox, outbox;

  $http.get('/emails').success(function (res) {
    inbox = res;
    $rootScope.$emit('initialDataLoaded');
  });

	$http.get('/sent').success(function (res) {
    outbox = res;
  });

  this.getInbox = function() {
    return inbox;
  };

  this.getOutbox = function() {
    return outbox;
  };

  // Get mails that are not currently on the list and notify directive
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
  };

  // Delete mail from the server
  this.removeMailFromServer = function (id) {
    $http.delete('/emails/'+id).success(function (res) {

    });
  };

  // Get single mail by id from inbox or outbox
  this.getMailById = function(id, box) {
    if (box === 'inbox') {
      if (inbox) {
        for (i = 0; i < inbox.length; i++) {
          if (inbox[i].id === id) {
            return(inbox[i]);
          }
        }
      } else {
        return(0);
      }
    }
  };

});