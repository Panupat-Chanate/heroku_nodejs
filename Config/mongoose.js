var mongoose = require('mongoose');
var config = require('./config');

module.exports = function() {
    mongoose.set('debug', config.debug);
    var db = mongoose.connect(config.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
    
    require('../App/models/user.model');

    return db;
}