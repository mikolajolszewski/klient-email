angular.module('emailClientApp').directive('emailList', function($rootScope, model, $location, mailUtils, options) {
  return {
    restrict: 'E',
		templateUrl: 'app/directives/mail_list_directive_template.html',
		link: function(scope, element) {
			scope.text = "loading...";
			scope.dataLoading = true;
			scope.deleteCell = true;
			scope.from_to = "From";
			var table = element.find("table");
			var lastEmail = {};

      // Rendering list from scratch
      var renderList = function() {
        emails = model.getInbox();
        if (emails) { // First iteration over not loaded server data needs to be passed
          if (emails.length > 0) { // Then check if the list is not empty. If yes, write on screen
            emails = emails.sort(mailUtils.sortBy('received',false)); // Sort the list
            lastEmail = emails[0]; // Store last email on the list (will be used while refreshing)
            for (i = 0; i < emails.length; i++) {
              table.append(mailUtils.prepareEmail(emails[i],"inbox"));
            }
            scope.dataLoading = false;
            scope.text = "";
          } else {
            scope.dataLoading = false;
            scope.text = "Sorry. There is no message to show.";
          }
        }
      };

      // Remove element
      var removeElement = function(element) {
        element.parentNode.removeChild(element);
        model.removeMailFromServer(element.id);
      };

      // Function refreshing and adding new entries to the email list
      $rootScope.$on('updateInbox', function (event, newMail) {
        if (newMail.length > 0) {
          newMail = newMail.sort(mailUtils.sortBy('received',false)); // Sort the list
          lastEmail = newMail[0]; // Store last email on the list (will be used while refreshing)
          for (i = 0; i < newMail.length; i++) {
            table.prepend(mailUtils.prepareEmail(newMail[i], "inbox"));
          }
        }
      });

			// bind click to path change
			element.bind('click', function(event) {
				var clickedEl = event.target;
				if (clickedEl.tagName === 'I') { // If we click trash icon
          removeElement(clickedEl.parentElement.parentElement);
				} else { // In other cases
          while(clickedEl !== undefined && clickedEl.tagName !== 'TR') { // If that's not TR
            clickedEl = clickedEl.parentElement; // let the clicked element be the parent
          }
          if(clickedEl.tagName === 'TR' & clickedEl.parentElement.tagName !== 'THEAD') { // When it's the parent
            model.markRead(clickedEl.id);
            $location.path("inbox/" + clickedEl.id); // Change location to email view
            scope.$apply();
          }
        }
			});

      // Load the list on app start
      $rootScope.$on('initialDataLoaded', function (event, arg) {
        renderList();
      });

      // Render list every other time
      renderList();

      // Make refresh every some interval
			setInterval(function() {
        model.getInboxUpdate(lastEmail); // update DOM
      }, options.getInterval());

    }
	};
});