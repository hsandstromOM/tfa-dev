module.exports = {
	url: '/team',
	template: require('raw!templates/team/team-view.html'),
	controller: TeamController,
	controllerAs: 'teamCtrl'
}

function TeamController($scope, $state, store, contentful, $window, $http) {
	var vm = this;
	$window.scrollTo(0, 0);
	vm.trustUrl = "trustUrl";

	trustUrl.$inject = ['$sce'];

	function trustUrl($sce) {
			return function (mediaUrl) {
				return $sce.trustAsResourceUrl(mediaUrl);
			};
		}

    // getTeamMemeber();
		//
    // function getTeamMemeber() {
    //   contentful.entries('content_type=bio&include=3&fields.teamMember=true').then(function(res) {
    //      console.log('teamMemeber data', res);
    //     $scope.teamMembers = res.data.items;
    //   });
    // }
}
