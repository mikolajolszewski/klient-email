angular.module('emailClientApp', ['ui.router','ui.bootstrap'])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
    .state('inbox', {
      url: "/inbox",
      controller: 'inboxController',
      templateUrl: "view/inbox.html"
    })
    .state('outbox', {
      url: "/outbox",
      controller: 'outboxController',
      templateUrl: "view/outbox.html"
    }).state('write', {
      url: "/write",
      controller: 'writeController',
      templateUrl: "view/write.html"
    }).state('options', {
      url: "/options",
      controller: 'optionsController',
      templateUrl: "view/options.html"
    }).state('mailPreview', {
      url: "/:box/:emailid",
      controller: 'previewController',
      templateUrl: "view/preview.html"
    });
})
;