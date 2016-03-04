var mongoose = require('mongoose');

/**	Represents a league itself	**/
var LeagueSchema = new mongoose.Schema({
  name: String,
  description: String,
  conferences: [{name: String}],
  rules: {
    playerPoints: Number,
    maxPlayerTeams: Number,
    playerTeamsPerConference: Number
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
	ref: 'LeaguePlayer'
  }],
  schedule: [{
    player: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'LeaguePlayer'
	},
	playerLineup: [{
	  team: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'Team'
	  },
	  teamPointsScored: Number,
	  versus: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'Team'
	  },
	  versusPointsScored: Number
	}],
  	opponent: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'LeaguePlayer'
 	},
    opponentLineup: [{
	  team: {
        type: mongoose.Schema.Types.ObjectId,
      	ref: 'Team'
	  },
	  teamPointsScored: Number,
  	  versus: {
        type: mongoose.Schema.Types.ObjectId,
      	ref: 'Team'
	  },
	  versusPointsScored: Number
    }],
    week: Number,
    year: Number,
    lastUpdated: { type: Date, default: Date.now }
  }],
  association: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Association'
  },
  lastUpdated: { type: Date, default: Date.now }
});

LeagueSchema.index({name:1},{unique:true});

module.exports = mongoose.model('League', LeagueSchema);