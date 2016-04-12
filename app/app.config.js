(function(){
	'use strict';

	var configs = {
		STATUS_CHECK_TIMER_LIMIT_MINUTES: 60 * 24,
		SITE_URL: 'http://5.189.161.54/',
		API_BASE_URL: '/api/v1/',
		SUGGESTIONS_FORUM_ID: 25,
	};

	var userClasses = {
		STATIST:			{id: 0, name: 'Statist'},
		SKADIS:				{id: 1, name: 'Skådis'},
		FILMSTJARNA:		{id: 2, name: 'Filmstjärna'},
		REGISSAR:			{id: 3, name: 'Regissör'},
		PRODUCENT:			{id: 4, name: 'Producent'},
		UPLOADER:			{id: 6, name: 'Uploader'},
		VIP: 				{id: 7, name: 'VIP'},
		STAFF:				{id: 8, name: 'Staff'},
	};

	var categories = {
		AudioTrack:			{id: 6, text: 'Audio Track'},
		Documentary:		{id: 3, text: 'Documentary'},
		Misc_Demo:			{id: 8, text: 'Misc/Demo'},
		Movie:				{id: 1, text: 'Movie'},
		Music:				{id: 4, text: 'Music'},
		Sport:	 			{id: 5, text: 'Sport'},
		TV:					{id: 2, text: 'TV'},
		XXX:				{id: 7, text: 'XXX'},
	};

	var Codecs = {
		H264:				{id: 1, text: 'H.264'},
		MPEG2:				{id: 2, text: 'MPEG-2'},
		VC1:				{id: 3, text: 'VC-1'},
		XviD:				{id: 4, text: 'XviD'},
	};
	var Mediums = {
		Bluray:				{id: 1, text: 'Blu-ray/HD DVD'},
		Capture:			{id: 4, text: 'Capture'},
		Encode:				{id: 3, text: 'Encode'},
		Remux:				{id: 5, text: 'Remux'},
		WEBDL:				{id: 6, text: 'WEB-DL'},
	};	

	var cssDesigns = {
		STANDARD:			{ id: 0, text: 'Standard'},
		BLUE:				{ id: 2, text: 'Standard blå'},
		CUSTOM_EXTERNAL:	{ id: 1, text: 'Anpassad extern CSS'},
	};


	function AppConfig($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $httpProvider) {
		$compileProvider.debugInfoEnabled(true);
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
		$httpProvider.useApplyAsync(true);
	}

	function ResourceExtension($resource, configs) {
		/* Extending angular ngResource with PATCH (update) method */
		return function (url, params, methods) {
			var defaults = {
				update: { method: 'patch', isArray: false }
			};
			methods = angular.extend(defaults, methods);
			return $resource(configs.API_BASE_URL + url, params, methods);
		};
	}

	function AppRun($rootScope, $state) {
		// To get ui-sref-active to work on child states
		// https://github.com/angular-ui/ui-router/issues/948#issuecomment-75342784
		$rootScope.$on('$stateChangeStart', function(evt, to, params) {
			if (to.redirectTo) {
				evt.preventDefault();
				$state.go(to.redirectTo, params);
			}
		});
	}

	angular
		.module('app.shared')
		.constant('configs', configs)
		.constant('userClasses', userClasses)
		.constant('categories', categories)
		.constant('Codecs', Codecs)
		.constant('Mediums', Mediums)
		.constant('cssDesigns', cssDesigns)
		.config(AppConfig)
		.factory('resourceExtension', ResourceExtension)
		.run(AppRun);

})();
