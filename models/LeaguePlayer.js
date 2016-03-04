var mongoose = require('mongoose');

/**	Represents a user / player	**/
var LeaguePlayerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  nickname: String,
  emailAddress: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  leagues: [{
	_id: {
		type: mongoose.Schema.Types.ObjectId,
	    ref: 'League'
	},
  	roster: [{
  		team: {
      		type: mongoose.Schema.Types.ObjectId,
      		ref: 'Team'
		},
		bid: Number,
		altBid: Number,
		winner: Boolean,
    	lastUpdated: { type: Date, default: Date.now }
  	}],
	userType: { type: String, default: 'player' },
	conference: String,
    teamName: String,
    teamLogo: String,
    overallRecord: {
		wins: { type: Number, default: 0 },
		losses: { type: Number, default: 0 },
		ties: { type: Number, default: 0 }
	},
    conferenceRecord: {
		wins: { type: Number, default: 0 },
		losses: { type: Number, default: 0 },
		ties: { type: Number, default: 0 }
	},	
	rank: { type: Number, default: 0 },
	gamesBack: { type: Number, default: 0 },
	pointsFor: { type: Number, default: 0 },
	pointsAgainst: { type: Number, default: 0 },
	lastUpdated: { type: Date, default: Date.now }
  }],
  updated_at: { type: Date, default: Date.now }
});

LeaguePlayerSchema.index({emailAddress:1},{unique:true});

module.exports = mongoose.model('LeaguePlayer', LeaguePlayerSchema);