var _logger, _playerService;

module.exports = {

	init: function( logger, playerService ) {

		_logger = logger;
		_playerService = playerService;
	},
	
    getPlayer: function(req, res, next) {

 		_playerService.getPlayerById(req.params.id,function (player) {
			res.json(player);
  		});
	},
	
    getPlayers: function(req, res, next) {

		if( req.query['emailAddress'] ) {
  			_playerService.getPlayerByEmailAddress(req.query['emailAddress'],function (player) {
    			res.json(player);
  			});
  		} else if( req.query['playerIds'] ) {
  			_playerService.getPlayersByIds(req.query['playerIds'],function (player) {
    			res.json(player);
  			});
	  	} else if( req.query['firstName'] && req.query['lastName'] ) {
  			_playerService.getPlayersByName(req.query['firstName'],req.query['lastName'],function (player) {
    			res.json(player);
  			});
	  	} else if( req.query['search'] ) {  	
  			_playerService.searchPlayers(req.query['search'],function (player) {
    			res.json(player);
  			});
  		} else {
  			_playerService.getPlayers(function (players) {
    			res.json(players);
  			});
  		}
	},
	
    updatePlayer: function(req, res, next) {

 		_playerService.updatePlayer(req.params.id,req.body,function (player) {
			res.json(player);
  		});
	},
	
    createPlayer: function(req, res, next) {

 		_playerService.createPlayer(req.body,function (player) {
			res.json(player);
  		});
	},
	
    deletePlayer: function(req, res, next) {

 		_playerService.deletePlayer(req.params.id,req.body,function (player) {
			res.json(player);
  		});
	}

}