'use strict';
(function () {

	angular.module('ff-app').
		controller('rootCtrl', ['$rootScope','$scope','$uibModal','$state','STATES', function($rootScope,$scope,$uibModal,$state,STATES) {

			$rootScope.isUserAuthenticated = function() {
				
				return $rootScope.currentUser !== undefined;
			};

			$scope.setAuthenticatedUser = function(authenticatedUser) {
			
				$rootScope.currentUser = authenticatedUser;
			}

			$scope.getAuthenticatedUser = function() {
			
				return $rootScope.currentUser;
			}

			$scope.isUserAuthorized = function( userAuthType ) {

				return $rootScope.currentUser.leagues.length > 0 &&
							$rootScope.currentUser.leagues[0].userType === userAuthType;
			}

			$scope.logout = function() {

				$rootScope.currentUser = undefined;
				
				$state.go(STATES.LOGIN_STATE);
			}

			$scope.openDialog = function(templateUrl,controller,resultFn) {

				$uibModal.open({
			      	templateUrl: templateUrl,
      					controller: controller
      				})
      				.result.then(resultFn);
			}

			$scope.onMenuItemClick = function( menuItemState ) {
				
				if( menuItemState ) {
				
					$state.go( menuItemState );
				}
			}
		}]);

})();