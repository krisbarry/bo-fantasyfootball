var _logger, _leagueService;

module.exports = {

	init: function(logger, leagueService) {
	
		_logger = logger;
		_leagueService = leagueService;
	},

	getLeague: function(req, res, next) {

 		_leagueService.getLeague(req.params.id, function(league) {
			res.json(league);
  		});
  	},

	getLeagues: function(req, res, next) {

 		_leagueService.getLeagues(function(leagues) {
			res.json(leagues);
  		});
  	},

	updateLeague: function(req, res, next) {

 		_leagueService.updateLeague(req.params.id,req.body, function(league) {
			res.json(league);
  		});
  	},

	createLeague: function(req, res, next) {

 		_leagueService.createLeague(req.body, function(league) {
			res.json(league);
  		});
  	},

	deleteLeague: function(req, res, next) {

 		_leagueService.deleteLeague(req.params.id,req.body, function(league) {
			res.json(league);
  		});
  	}

}