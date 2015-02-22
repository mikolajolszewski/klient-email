angular.module('emailClientApp').directive('outboxList', function($rootScope, model, $location, mailUtils) {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/mail_list_directive_template.html',
    link: function(scope, element) {
			scope.text = "loading...";
			scope.dataLoading = true;
			scope.deleteCell = false;
			scope.from_to = "To";
			var table = element.find("table");
			var lastEmail = {};

      // Rendering list from scratch
      var renderList = function() {
        emails = model.getOutbox();
        if (emails) { // First iteration over not loaded server data needs to be passed
          if (emails.length > 0) { // Then check if the list is not empty. If yes, write on screen
            emails = emails.sort(mailUtils.sortBy('sent',false)); // Sort the list
            lastEmail = emails[0]; // Store last email on the list (will be used while refreshing)
            for (i = 0; i < emails.length; i++) {
              table.append(mailUtils.prepareEmail(emails[i], "outbox"));
            }
            scope.dataLoading = false;
            scope.text = "";
          } else {
            scope.dataLoading = false;
            scope.text = "Sorry. There is no message to show.";
          }
        }
      };

      // Bind clicking the list
      element.bind('click', function(event) {
        var clickedEl = event.target;
        if (clickedEl.tagName === 'I') { // If we click trash icon
          removeElement(clickedEl.parentElement.parentElement);
				} else { // In other cases
          while(clickedEl !== undefined && clickedEl.tagName !== 'TR') {
              clickedEl = clickedEl.parentElement;
          }
          if(clickedEl.tagName === 'TR' & clickedEl.parentElement.tagName !== 'THEAD') {
              $location.path("outbox/" + clickedEl.id);
              scope.$apply();
          }
        }
      });

      // Render the list on app start (refreshed on that page)
      $rootScope.$on('initialOutboxDataLoaded', function (event, arg) {
        renderList();
      });

      // Render the list every other time
      renderList();

    }
	};
});