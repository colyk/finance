module.exports = {
    development: {
        db: 'mongodb://localhost/finance',
        port: process.env.PORT || 3000
    },
    production: {
        db: process.env.MONGOLAB_URI || 'you can add a mongolab uri here ($ heroku config | grep MONGOLAB_URI)',
        port: process.env.PORT || 80
    }
};