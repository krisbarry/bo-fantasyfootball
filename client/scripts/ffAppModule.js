'use strict';
(function () {

	/**
	 * Declaration of the root module for the fantasy football Angular application
	 */
	var FF_APP_VERSION = '1.0.00000';

	angular.module('ff-app', [
	  'ui.router', 'ngResource', 'ui.bootstrap', 'ff-app-constants', 'ff-app-services', 'home', 'team', 'administration'
	])
	.config(['$stateProvider','$urlRouterProvider','STATES', function($stateProvider,$urlRouterProvider,STATES) {

		// redirect any requests to '/login'
		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state(STATES.LOGIN_STATE, {
		    	url: '/login',
		    	views: {
	        	    'content' : {
	        	      templateUrl : 'scripts/views/login.html',
	        	      controller: 'loginCtrl'
	        	    }
	      		},
	      		resolve: {
	      			logFFAppVersion: function() {
		      			console.log('FF_APP_VERSION: ' + FF_APP_VERSION );
		      		}
	      		}
	  		})
			.state(STATES.MY_PROFILE_STATE, {
		    	url: '/my-profile',
		    	views: {
	        	    'content' : {
	        	      templateUrl : 'scripts/views/profile.html',
	        	      controller: 'profileCtrl'
	        	    }
	      		}
	  		});
	}])
  	.run( ['$rootScope', '$state', 'STATES', 'navigationService', function($rootScope, $state, STATES, navigationService ) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

	  		if( toState.name !== STATES.LOGIN_STATE && !$rootScope.isUserAuthenticated() ) {

				event.preventDefault();
  				$state.go(STATES.LOGIN_STATE);

	  		} else {
	  			
				navigationService.setPreviousState(fromState);
				navigationService.setPreviousStateParams(fromParams);
	  		}
	  	});
	}]);

})();