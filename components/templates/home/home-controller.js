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

// // makes the parallax elements
// function parallaxIt() {
//
//   // create variables
//   var $fwindow = $(window);
//   var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//
//   // on window scroll event
//   $fwindow.on('scroll resize', function() {
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   });
//
//   // for each of content parallax element
//   $('[data-type="content"]').each(function (index, e) {
//     var $contentObj = $(this);
//     var fgOffset = parseInt($contentObj.offset().top);
//     var yPos;
//     var speed = ($contentObj.data('speed') || 0 );
//
//     $fwindow.on('scroll resize', function (){
//       yPos = fgOffset - scrollTop / speed;
//
//       $contentObj.css('top', yPos);
//     });
//   });
//
//   // for each of background parallax element
//   $('[data-type="background"]').each(function(){
//     var $backgroundObj = $(this);
//     var bgOffset = parseInt($backgroundObj.offset().top);
//     var yPos;
//     var coords;
//     var speed = ($backgroundObj.data('speed') || 0 );
//
//     $fwindow.on('scroll resize', function() {
//       yPos = - ((scrollTop - bgOffset) / speed);
//       coords = '40% '+ yPos + 'px';
//
//       $backgroundObj.css({ backgroundPosition: coords });
//     });
//   });
//
//   // triggers winodw scroll for refresh
//   $fwindow.trigger('scroll');
// };
//
// parallaxIt();
