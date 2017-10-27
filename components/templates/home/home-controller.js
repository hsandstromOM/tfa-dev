module.exports = {
	url: '/',
	template: require('raw!templates/home/home-view.html'),
	controller: HomeController,
	controllerAs: 'homeCtrl',
};

function HomeController($scope, $state, store, $window, contentful, $http) {
	var vm = this;
  $window.scrollTo(0, 0);

	vm.trustUrl = "trustUrl";

	trustUrl.$inject = ['$sce'];

	function trustUrl($sce) {
			return function (mediaUrl) {
				return $sce.trustAsResourceUrl(mediaUrl);
			};
		}
	// 
	// contentful.entries('content_type=homePage').then(function(res) {
	// 	// console.log('home page contentful data',res);
	// 	$scope.home = res.data.items[0];
	// 	var seoData = res.data.items[0];
	// 	if (seoData.fields.seoTitle) {
	// 		document.title = seoData.fields.seoTitle;
	// 	}
	// 	if (seoData.fields.seoDescription) {
	// 		var meta = document.getElementsByTagName("meta");
	// 		for (var i = 0; i < meta.length; i++) {
	// 			if (meta[i].name.toLowerCase() === "description") {
	// 				meta[i].content = seoData.fields.seoDescription;
	// 			}
	// 		}
	// 	}
	// 	if (seoData.fields.seoKeywords) {
	// 		var meta = document.getElementsByTagName("meta");
	// 		for (var i = 0; i < meta.length; i++) {
	// 			if (meta[i].name.toLowerCase() === "keywords") {
	// 				meta[i].content = seoData.fields.seoKeywords;
	// 			}
	// 		}
	// 	}
	// });

}
