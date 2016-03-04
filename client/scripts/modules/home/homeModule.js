'use strict';
(function () {

	angular.module('home', [
		'ui.router', 'ui.bootstrap', 'ff-app-constants', 'ff-app-services'
	])
	.config(['$stateProvider','$urlRouterProvider','STATES', function($stateProvider,$urlRouterProvider,STATES) {

		// redirect to /home
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state(STATES.HOME_STATE, {
		    	url: '/home',
		    	views: {
	        	    'content' : {
	        	      templateUrl : 'scripts/modules/home/views/home.html',
	        	      controller: 'homeCtrl'
	        	    }
	      		}
	  		});
	}]);

})();