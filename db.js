const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

env = {
  development: {
    db: 'mongodb://localhost/finance',
    port: process.env.PORT || 3000
  },
  production: {
    db: process.env.MONGODB_URI,
    port: process.env.PORT
  }
}
const envConfig = env[process.env.NODE_ENV || 'development'];

console.log('DB config: ', envConfig);

mongoose.connect(envConfig.db, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 3000 });

mongoose.connection.on('connected', function () {
  console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
})

module.exports = mongoose;
