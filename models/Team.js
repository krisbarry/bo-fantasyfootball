var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
  name: String,
  acronym: String,
  mascot: String,
  conference: String,
  association: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Association'
  },
  lastUpdated: { type: Date, default: Date.now }
});

TeamSchema.index({name:1},{unique:true});

module.exports = mongoose.model('Team', TeamSchema);