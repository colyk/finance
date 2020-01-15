const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./db');


app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'UPDATE'],
  credentials: true
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('trust proxy', true);
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: new MongoStore({
    mongooseConnection: db.connection
  })
}));

require('express-async-errors');
require('./routes/routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

http.createServer(app).listen(process.env.PORT || 8000);
