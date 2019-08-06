const express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
const path = require('path');

const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyB9A1305wxSp3cm6WxDA0dJXahS7X1ucLE",
    authDomain: "roadbud-55a2b.firebaseapp.com",
    databaseURL: "https://roadbud-55a2b.firebaseio.com",
    projectId: "roadbud-55a2b",
    storageBucket: "",
    messagingSenderId: "1039100366181"
};
firebase.initializeApp(firebaseConfig);
// Create a new Express application instance
module.exports = function () {
    //Create the Express application object
    var app = express();
    //the process.env property allows you to access predefined environment variables 
    //such as NODE_ENV
    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json()); //use middleware that only parses json
    app.use(methodOverride()); // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
    //saveUninitialized - forces a session that is "uninitialized" to be saved to the store
    //resave - forces the session to be saved back to the session store
    //Configure Express to use EJS module as the default template engine
    // Set the application view engine and 'views' folder
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use('/', express.static(path.resolve('./public')));
    app.use('/lib', express.static(path.resolve('./node_modules')));

    require('../routes/buddy.server.route')(app);
    

    //bootstrap the app using the controller and routing modules
    //The express.static() middleware takes one argument 
    //to determine the location of the static folder
    //Configure static file serving
    app.use(express.static('./public'));
    return app;
};
