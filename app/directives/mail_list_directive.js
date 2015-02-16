angular.module('emailClientApp').directive('emailList', function($rootScope, model, $location, mailUtils) {
  return {
    restrict: 'E',
		templateUrl: 'app/directives/mail_list_directive_template.html',
		link: function(scope, element) {
			scope.text = "loading...";
			scope.dataLoading = true;
			var table = element.find("table");
			var lastEmail = {};

      /* Rendering list from scratch */
      var renderList = function() {
        emails = model.getInbox();
        if (emails) { // First iteration over not loaded server data needs to be passed
          if (emails.length > 0) { // Then check if the list is not empty. If yes, write on screen
            emails = emails.sort(mailUtils.sortBy('received',false)); // Sort the list
            lastEmail = emails[0]; // Store last email on the list (will be used while refreshing)
            for (i = 0; i < emails.length; i++) {
              table.append(prepareEmail(emails[i]));
            }
            scope.dataLoading = false;
            scope.text = "";
          } else {
            scope.dataLoading = false;
            scope.text = "Sorry. There is no message to show.";
          }
        }
      }

      /* Function preparing email <tr> DOM object */
      var prepareEmail = function(email) {
        var tableRow = document.createElement("tr"),
        fromCell = document.createElement("th"),
        subjectCell = document.createElement("th"),
        contentCell = document.createElement("th"),
        dateCell = document.createElement("th"),
        deleteCell = document.createElement("th"),
        date = new Date(email.received);

        if (email.read === false) {
          tableRow.className = "unread"
        } else {
          tableRow.className = "read"
        }

        tableRow.id = email.id
        fromCell.innerHTML = email.sender;
        subjectCell.innerHTML = email.title;
        contentCell.innerHTML = email.content.substring(0,15) + '...';
        dateCell.innerHTML = date;
        deleteCell.innerHTML = '<i class="icon-trash"></i>';

        tableRow.appendChild(fromCell);
        tableRow.appendChild(subjectCell);
        tableRow.appendChild(contentCell);
        tableRow.appendChild(dateCell);
        tableRow.appendChild(deleteCell);

        return(tableRow);

      };

      // Function refreshing and adding new entries to the email list
      $rootScope.$on('updateInbox', function (event, newMail) {
        console.log(newMail);
        if (newMail.length > 0) {
          console.log('passed',newMail);
          newMail = newMail.sort(mailUtils.sortBy('received',false)); // Sort the list
          lastEmail = newMail[0]; // Store last email on the list (will be used while refreshing)
          for (i = 0; i < newMail.length; i++) {
            table.prepend(prepareEmail(newMail[i]));
          }
        }
      });

			// bind click to path change
			element.bind('click', function(event) {
				var clickedEl = event.target;
				while(clickedEl !== undefined && clickedEl.tagName !== 'TR') {
					clickedEl = clickedEl.parentElement;
				}
				if(clickedEl.tagName === 'TR') {
					$location.path("view/" + clickedEl.id);
					scope.$apply();
				}
			});

      /* Load the list on app start */
      $rootScope.$on('initialDataLoaded', function (event, arg) {
        renderList();
      });

      /* Render list every other time */
      renderList();

      /* Make refresh every 2000 seconds */
			setInterval(function() {
			  console.log('inside interval');
        model.getInboxUpdate(lastEmail); // update DOM
      }, 20000);

    }
	};
});