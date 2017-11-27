module.exports = {
	url: '/our-story',
	template: require('raw!templates/our-story/our-story-view.html'),
	controller: OurStoryController,
	controllerAs: 'ourStoryCtrl'
}

function OurStoryController($scope, $state, store, contentful, $window, $http) {
	var vm = this;
	$window.scrollTo(0, 0);
	vm.trustUrl = "trustUrl";

	trustUrl.$inject = ['$sce'];

	function trustUrl($sce) {
			return function (mediaUrl) {
				return $sce.trustAsResourceUrl(mediaUrl);
			};
		}
		$(function() {
  var ctrl = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  });

  $('section').each(function() {

    var name = $(this).attr('id');

    new ScrollMagic.Scene({
      triggerElement: this
    })
    .setPin(this)
    .addIndicators({
      colorStart: "rgba(255,255,255,0.5)",
      colorEnd: "rgba(255,255,255,0.5)",
      colorTrigger : "rgba(255,255,255,1)",
      name:name
    })
    .addTo(ctrl)
  });

  // get window height
  var wh = window.innerHeight;

  new ScrollMagic.Scene({
    offset: wh*0.75
  })
  .setClassToggle("section#two", "is-active")
  .addTo(ctrl);

  new ScrollMagic.Scene({
    offset: wh*1.75
  })
  .setClassToggle("section#three", "is-active")
  .addTo(ctrl);

  new ScrollMagic.Scene({
    offset: wh*2.75
  })
  .setClassToggle("section#four", "is-active")
  .addTo(ctrl);

})(jQuery);



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
