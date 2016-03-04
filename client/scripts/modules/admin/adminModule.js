'use strict';
(function () {

	angular.module('administration', [
		'ui.router', 'ui.bootstrap', 'ff-app-constants', 'ff-app-services'
	])
	.config(['$stateProvider','$urlRouterProvider','STATES', function($stateProvider,$urlRouterProvider,STATES) {

		// redirect /admin request to '/admin/leagues'
		$urlRouterProvider.when('/admin', '/admin/leagues');

		$stateProvider
			.state(STATES.ADMIN_STATES.ADMIN_STATE, {
	    	url: '/admin',
	    	replace : true,
	    	redirectTo : STATES.ADMIN_STATES.ADMIN_LEAGUES_STATE,
	    	views: {
		       	'content':{
		            templateUrl : 'scripts/modules/admin/views/administration.html'
		        }
	        }
		})
		.state(STATES.ADMIN_STATES.ADMIN_LEAGUES_STATE, {
	    	url: '/admin/leagues',
	    	views: {
        	    'administration' : {
        	      templateUrl : 'scripts/modules/admin/views/leagues.html',
        	      controller: 'allLeaguesCtrl'
        	    }
        	}
  		})
		.state(STATES.ADMIN_STATES.ADMIN_LEAGUE_STATE, {
	    	url: '/admin/league/{leagueId:.*}',
	    	views: {
        	    'administration' : {
        	      templateUrl : 'scripts/modules/admin/views/league.html',
        	      controller: 'leagueDetailsCtrl'
        	    }
        	}
  		})
		.state(STATES.ADMIN_STATES.ADMIN_PLAYERS_STATE, {
	    	url: '/admin/players',
	    	views: {
        	    'administration' : {
        	      templateUrl : 'scripts/modules/admin/views/players.html',
        	      controller: 'allPlayersCtrl'
        	    }
        	}
  		})
		.state(STATES.ADMIN_STATES.ADMIN_PLAYER_STATE, {
	    	url: '/admin/player/{playerId:.*}',
	    	views: {
        	    'administration' : {
        	      templateUrl : 'scripts/views/profile.html',
        	      controller: 'playerDetailsCtrl'
        	    }
        	}
  		})
		.state(STATES.ADMIN_STATES.ADMIN_BIDDING_STATE, {
	    	url: '/admin/bidding',
	    	views: {
        	    'administration' : {
        	      templateUrl : 'scripts/modules/admin/views/bids.html',
        	      controller: 'allBidsCtrl'
        	    }
        	}
  		});
	}]);

})();