const { config_options } = require('../config.js');

var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:' + config_options.mongodb_port.toString() + '/recite_word';

mongoose.connect(DB_URL,{ useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
