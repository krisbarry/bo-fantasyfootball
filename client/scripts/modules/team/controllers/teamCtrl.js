'use strict';
(function () {

	angular.module('ff-app').
		controller('teamCtrl', ['$scope','playerResource', function($scope,playerResource) {

			var init = function() {

//				playerService.getTeam()...
				$scope.team = {};
			};

			init();

		}]);
})();