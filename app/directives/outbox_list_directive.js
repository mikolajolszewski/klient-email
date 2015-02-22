angular.module('emailClientApp').directive('outboxList', function($rootScope, model, $location, mailUtils) {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/outbox_list_directive_template.html',
    link: function(scope, element) {
			scope.text = "loading...";
			scope.dataLoading = true;
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
              table.append(mailUtils.prepareSentEmail(emails[i]));
            }
            scope.dataLoading = false;
            scope.text = "";
          } else {
            scope.dataLoading = false;
            scope.text = "Sorry. There is no message to show.";
          }
        }
      };
        
      $rootScope.$on('updateOutbox', function (event, newMail) {
          table.prepend(mailUtils.prepareSentEmail(newMail));
      });
        
        
      element.bind('click', function(event) {
        var clickedEl = event.target;
        while(clickedEl !== undefined && clickedEl.tagName !== 'TR') {
            clickedEl = clickedEl.parentElement;
        }
        if(clickedEl.tagName === 'TR') {
            $location.path("outbox/" + clickedEl.id);
            scope.$apply();
        }
      });
        
      $rootScope.$on('initialOutboxDataLoaded', function (event, arg) {
        renderList();
      });
        
      renderList();

    }
	};
});