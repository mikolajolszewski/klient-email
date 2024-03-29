angular.module('emailClientApp').service('model', function($http, $rootScope, $location) {
  var inbox, outbox;

  // On app start get inbox and outbox from the server
  $http.get('/emails').success(function (res) {
    inbox = res;
    $rootScope.$emit('initialDataLoaded');
  });

	$http.get('/sent').success(function (res) {
    outbox = res;
    $rootScope.$emit('initialOutboxDataLoaded');
  });

  // Return object with inbox
  this.getInbox = function() {
    return inbox;
  };

  // Return object with outbox
  this.getOutbox = function() {
    return outbox;
  };

  this.sendEmail = function(receivers, title, content) {
	var email = {"id":new Date().getTime(), "title":title, "receivers":receivers, "content":content, "sent": new Date().getTime()};
    $http.post('/sent', email).success(function (res) {
      outbox.push(email);
      $location.path("outbox");
    });
	};

  // Get mails that are not currently on the list and notify directive
  this.getInboxUpdate = function(lastMail) {
    var newMail = [], j = 0;
    $http.get('/emails').success(function (res) {
      inbox = res;
      for (i = 0; i < inbox.length; i++) {
        if (inbox[i].received >= lastMail.received && inbox[i].id != lastMail.id) {
          newMail[j] = inbox[i];
          j++;
        }
      }
      $rootScope.$emit('updateInbox', newMail);
    });
  };

  // Delete mail from the server and from our current "inbox variable"
  this.removeMailFromServer = function (id) {
    $http.delete('/emails/'+id).success(function (res) {
    });

    for (i = 0; i < inbox.length; i++) {
      if (inbox[i].id === id) {
        inbox.splice(i, 1);
      }
    }
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
    else {
        if (outbox) {
            for (i = 0; i < outbox.length; i++) {
              if (outbox[i].id === parseInt(id)) {
                return(outbox[i]);
              }
            }
      } else {
        return(0);
      }
    }
  };

  // Mark email as read
  this.markRead = function(id) {
    updatedMail = {};
    for (i = 0; i < inbox.length; i++) {
      if (inbox[i].id === id) {
        inbox[i].read = true;
        updatedMail = inbox[i];
      }
    }
    $http.put('/emails/'+id, updatedMail).success(function (res) {
    });
  };

});
