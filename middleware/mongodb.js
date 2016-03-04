var mongoose = require('mongoose');

exports.init = function(config,logger,callback) {
//exports.init = function(app, config, logger, callback) {

	mongoose.connect(config.get('mongodb').url, function(err) {
		if(err) {
			logger.debug('connection error: ',err);
		} else {
			logger.debug('connection successful!');
		}
	});

	callback();
};