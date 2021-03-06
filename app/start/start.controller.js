(function(){
	'use strict';

	angular
		.module('app.shared')
		.controller('StartController', StartController);

	function StartController(StartTorrentsResource, NewsResource, StatisticsResource, PollsResource) {

		this.pollAnswer = '';

		this.fetchPoll = function () {
			PollsResource.Latest.get({}, (data) => {
				this.poll = data;
			});
		};

		this.fetchData = function () {
			StartTorrentsResource.query({}, (data) => {
				this.highligtedTorrents = data;
			});

			StatisticsResource.get({id: 'start'}, (data) => {
				this.stats = data;
			});
		};

		this.vote = function () {
			PollsResource.Votes.save({id: this.poll.id, choise: this.poll.myChoise}, () => {
				this.fetchPoll();
			});
		};

		this.fetchData();
		this.fetchPoll();
	}
})();
