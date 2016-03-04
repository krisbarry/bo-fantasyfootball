'use strict';
(function () {

	angular.module('ff-app-constants')
		.constant(
			'MENU_ITEMS', [
				{
					id: 'home',
					title: 'Home',
					state: 'home',
					iconClass: 'fa-home'
				},
				{
					id: 'my-team',
					title: 'My Team',
					state: 'my-team',
					iconClass: 'fa-group'
				},
				{
					id: 'admin',
					title: 'Administration',
					iconClass: 'fa-user-plus',
					userTypeAuth: 'admin',
					subMenuItems: [
						{
							state: 'admin.leagues',
							title: 'Leagues',
							iconClass: 'fa-group',
						},
						{
							state: 'admin.players',
							title: 'Player Profiles',
							iconClass: 'fa-user',
						},
						{
							state: 'admin.bidding',
							title: 'Bidding',
							iconClass: 'fa-money',
						}					
					]
				}
			]	
		);
	
})();
