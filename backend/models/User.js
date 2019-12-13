const mongoose = require('mongoose');
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envConfig = require('../env')[env];

mongoose.Promise = require('bluebird');
mongoose.connect(envConfig.db, { useMongoClient: true, });
mongoose.connection.on('connected', function () {
    console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

const userModel = mongoose.Schema({
    name: String,
    password: String,
    date: { type: Date, default: Date.now },
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userModel);