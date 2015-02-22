angular.module('emailClientApp').service('model', function($http, $rootScope, $location) {
  var inbox, outbox;

  $http.get('/emails').success(function (res) {
    inbox = res;
    $rootScope.$emit('initialDataLoaded');
  });

	$http.get('/sent').success(function (res) {
    outbox = res;
    $rootScope.$emit('initialOutboxDataLoaded');
  });

  this.getInbox = function() {
    return inbox;
  };

  this.getOutbox = function() {
    return outbox;
  };

  this.sendEmail = function(receivers, title, content) {
	console.log(receivers, title, content, new Date());
	var email = {"id":new Date().getTime(), "title":title, "receivers":receivers, "content":content, "sent": new Date()};
	$http.post('/sent', email).success(function (res) {
		outbox.push(email);
		$location.path("outbox");
		console.log(res);
		});
    $rootScope.emit('updateOutbox', body);
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

  // Set background color
  this.setBackgroundColor = function (color) {
    if (color === null) {
      return;
    }
    localStorage.setItem ("color", color);
  }

  // Get background color
  this.getBackgroundColor = function () {
    var color = localStorage.getItem("color");
    if (color === null) {
        return white;
    }
    return color;
  }

  // Set interval[
  this.setInterval = function (time) {
    if (time === null) {
      return;
    }
    localStorage.setItem ("time", time);
  }

  // Get Interval
  this.getInterval = function () {
    var time = localStorage.getItem("time");
    if (time === null) {
      return 20000;
    }
    return time;
  }

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
      console.log('zaktualizowane na serwie');
    });
  };

});
