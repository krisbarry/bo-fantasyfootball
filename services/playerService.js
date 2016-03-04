var _logger;
var LeaguePlayer = require('../models/LeaguePlayer.js');

exports.init = function(logger, config, callback) {

    _logger = logger;

    callback();
};

exports.getPlayerById = function(id,callback) {

  LeaguePlayer.findById(id, 
  	function (err,player) {
    	if (err) throw err;
		callback(player);
  	});
};

exports.getPlayersByIds = function(ids,callback) {
  	LeaguePlayer.find({_id: { $in: ids.split(',') }}, function (err, player) {
		if (err) throw err;
    	callback(player);
  	});
};

exports.getPlayersByName = function(firstName,lastName,callback) {

  	LeaguePlayer.find({ $and: [
  		{firstName: firstName},
  			{lastName: lastName}
  		]}, function (err, player) {
  				if (err) throw err;
    			callback(player);
  			});
};

exports.getPlayerByEmailAddress = function(emailAddress,callback) {

	LeaguePlayer.findOne({emailAddress:emailAddress},
		function (err, player) {
			if (err) throw err;
			callback( player ? decryptPassword(player) : {} );
 		});
};

exports.getPlayers = function(callback) {
    LeaguePlayer.find(function (err, players) {
      if (err) throw err;
      callback(players);
    });
};

exports.searchPlayers = function(searchTerm,callback) {
	var searchTermRegExp = new RegExp(searchTerm);
  	LeaguePlayer.find({ $or: [
 		{firstName: { $regex: searchTermRegExp, $options: 'i' }},
	 		{lastName: { $regex: searchTermRegExp, $options: 'i' }},
		  		{nickname: { $regex: searchTermRegExp, $options: 'i' }},
		  			{emailAddress: { $regex: searchTermRegExp, $options: 'i' }}
		]}, function (err, player) {
  				if (err) throw err;
    			callback(player);
  			});
};

exports.updatePlayer = function(playerId, playerToUpdate, callback) {

//  playerToUpdate.leagues[0].userType = 'admin';

  LeaguePlayer.findByIdAndUpdate( playerId, 
  	playerToUpdate.password ? encryptPassword(playerToUpdate) : playerToUpdate, 
  		function (err, playerUpdated) {
    		if (err) throw err;
    		callback(playerUpdated);
  		});
};

exports.createPlayer = function(playerToCreate, callback) {

  LeaguePlayer.create( encryptPassword(playerToCreate), function (err, playerCreated) {
    if (err) throw err;
    callback(playerCreated);
  });
};

exports.deletePlayer = function(id, playerToDelete,callback) {

  LeaguePlayer.findByIdAndRemove(id, playerToDelete, function (err, playerDeleted) {
    if (err) throw err;
    callback(playerDeleted);
  });
};

function encryptPassword(player) {

	player.password = new Buffer(player.password).toString('base64');
	return player;
}

function decryptPassword(playerResult) {

	playerResult.password = new Buffer(playerResult.password,'base64').toString('binary');
	return playerResult;
}
