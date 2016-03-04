'use strict';
(function () {

	angular.module('ff-app-constants',[])
		.constant(
			'STATES', {
				'LOGIN_STATE': 'login',
					'MY_PROFILE_STATE': 'my-profile',
						'HOME_STATE': 'home',
							'MY_TEAM_STATE': 'my-team',
								'ADMIN_STATES': {
									'ADMIN_STATE': 'admin',
										'ADMIN_LEAGUE_STATE': 'admin.league',
											'ADMIN_LEAGUES_STATE': 'admin.leagues',
												'ADMIN_PLAYER_STATE': 'admin.player',
													'ADMIN_PLAYERS_STATE': 'admin.players',
														'ADMIN_BIDDING_STATE': 'admin.bidding'
								}
			}
		)
		.constant(
			'SERVICE_URLS', {
				'PLAYER_SERVICE': 'http://localhost:3000/league-player/:id',
					'TEAM_SERVICE': 'http://localhost:3000/teams/:id',
						'BID_SERVICE': 'http://localhost:3000/bids/:id',
							'CONFERENCE_SERVICE' : 'http://localhost:3000/conferences/:id'
			}
		);
	
})();
