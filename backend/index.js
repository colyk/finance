const app = require('./app');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/finance';

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db("finance");
    var cursor = db.collection('users').find({});

    function iterateFunc(doc) {
        console.log(JSON.stringify(doc, null, 4));
    }

    function errorFunc(error) {
        console.log(error);
    }

    cursor.forEach(iterateFunc, errorFunc);

    client.close();
});

http.createServer(app).listen(process.env.PORT || 8000);