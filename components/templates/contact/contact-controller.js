module.exports = {
	url: '/contact',
	template: require('raw!templates/contact/contact-view.html'),
	controller: ContactController,
	controllerAs: 'contactCtrl'
}

function ContactController(contentful, $window, $state, $http, $timeout, $scope) {
	var vm = this;
	$window.scrollTo(0, 0);
	vm.showConfirmationLayer = false;
	vm.showErrorLayer = false;
}
