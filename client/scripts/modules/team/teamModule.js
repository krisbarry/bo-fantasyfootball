'use strict';
(function () {

	angular.module('team', [
		'ui.router', 'ui.bootstrap', 'ff-app-constants', 'ff-app-services'
	])
	.config(['$stateProvider','$urlRouterProvider','STATES', function($stateProvider,$urlRouterProvider,STATES) {

		// redirect to /team
		$urlRouterProvider.otherwise('/team');

		$stateProvider
			.state(STATES.MY_TEAM_STATE, {
		    	url: '/my-team',
		    	views: {
	        	    'content' : {
	        	      templateUrl : 'scripts/modules/team/views/team.html',
	        	      controller: 'teamCtrl'
	        	    }
	      		}
	  		});
	}]);

})();