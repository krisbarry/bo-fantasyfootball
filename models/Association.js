var mongoose = require('mongoose');

var AssociationSchema = new mongoose.Schema({
  name: String,
  acronym: String,
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Association', AssociationSchema);