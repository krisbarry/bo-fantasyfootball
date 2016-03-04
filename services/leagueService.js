var League = require('../models/League.js');

var _logger;

exports.init = function(logger, config, callback) {

    _logger = logger;
    
    callback();
};

exports.getLeague = function(id,callback) {

  League.findById(id, 
  	function (err,league) {
    	if (err) throw err;
		if( league.players.length > 0 ) {
			services.get('playerService').getPlayersByIds(league.players.toString(), 
				function(players) {
					league.players = players;
					callback(league);
				});
		} 
		else callback(league);
  	});
};

exports.getLeagues = function(callback) {

  League.find(function (err, leagues) {
    if(err) throw err;
    callback(leagues);
  });
};

exports.updateLeague = function(id, leagueToUpdate, callback) {
  League.findByIdAndUpdate(id, leagueToUpdate, function (err, leagueUpdated) {
    if (err) throw err;
    if( leagueToUpdate.players && leagueToUpdate.players.length > 0 ) {
		leagueToUpdate.players.forEach(function(playerToUpdate) {
			services.get('playerService').updatePlayer(playerToUpdate._id, {
				_id: playerToUpdate._id,
					leagues: playerToUpdate.leagues
			}, function(playerUpdated) {
//					_logger.debug(playerUpdated.emailAddress+' updated...');
				});
		});
	}
    callback(leagueUpdated);
  });
};

exports.createLeague = function(leagueToCreate, callback) {
  League.create(leagueToCreate, function (err, leagueCreated) {
    if (err) throw err;
    if( leagueToCreate.players && leagueToCreate.players.length > 0 ) {
		leagueToCreate.players.forEach(function(playerToUpdate) {
			services.get('playerService').updatePlayer(playerToUpdate._id, {
				_id: playerToUpdate._id,
					leagues: playerToUpdate.leagues
			}, function(playerUpdated) {
//					_logger.debug(playerUpdated.emailAddress+' updated...');
				});
		});
	}
    callback(leagueCreated);
  });
};

exports.deleteLeague = function(id, leagueToDelete, callback) {
  League.findByIdAndRemove(id, leagueToDelete, function (err, leagueDeleted) {
    if (err) throw err;
    callback(leagueDeleted);
  });
};