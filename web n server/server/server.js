process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Load the module dependencies
const express = require('./config/express');
// Create a new Express application instance
const app = express();
const firebase = require('firebase');
const socket = require('socket.io');
app.get('/', function (req, res) {
  
    console.log("HTTP Get Request");
    res.send("HTTP GET Request");
    //Insert key,value pair to database
    var starCountRef = firebase.database().ref('/TestMessages');
    starCountRef.set({TestMessage: 'GET Request'});
    starCountRef.on('value', function(snapshot) {
        console.log("Chal Baaar");
    });
  });
// Use the Express application instance to listen to the '3000' port
const server = app.listen(3000, '0.0.0.0');
const io = socket(server);
app.io = io;

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app; //returns the application object
// Log the server status to the console
console.log('Server running at http://localhost:3000/');
