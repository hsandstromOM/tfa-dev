module.exports = {
	url: '/our-values',
	template: require('raw!templates/about/about-view.html'),
	controller: AboutController,
	controllerAs: 'aboutCtrl'
}

function AboutController($scope, $state, store, contentful, $window, $http) {
	var vm = this;
	$window.scrollTo(0, 0);
	vm.trustUrl = "trustUrl";

	trustUrl.$inject = ['$sce'];

	function trustUrl($sce) {
			return function (mediaUrl) {
				return $sce.trustAsResourceUrl(mediaUrl);
			};
		}

	// contentful.entries('content_type=aboutPage').then(function(res) {
	// 	$scope.about = res.data.items[0];
	// 	vm.contentfulData = res.data.items[0];
	// 	if (vm.contentfulData.fields.bannerHeadline) {
	// 		document.title = vm.contentfulData.fields.bannerHeadline;
	// 	}
	// 	if (vm.contentfulData.fields.seoDescription) {
	// 		var meta = document.getElementsByTagName("meta");
	// 		for (var i = 0; i < meta.length; i++) {
	// 			if (meta[i].name.toLowerCase() === "description") {
	// 				meta[i].content = vm.contentfulData.fields.seoDescription;
	// 			}
	// 		}
	// 	}
	// });
}
