'use strict';

const express = require('express');
const app = express();

const config = require('./config.js');
const routes = require('./routes/index');

const pug = require('pug');
//set folder structure for middleware to be able to call stylesheets
app.use(express.static(__dirname + '/public'));
//set up pug view engine to serve middleware
app.set('view engine', 'pug');
//set up template directory
app.set('views', __dirname + '/views');

app.use('/', routes);

// Start web server on port 3000
app.listen(3000, () => {
    console.log(`The frontend server is running on port 3000...`);
});


//Using Node and Express, request the data you need from Twitter’s API, render it in your template, and send it to the client at the “/” route. Please avoid using Express generator to set up this project. It will be good practice to set up a simple Express app yourself!
// Each rendered result must include all of the information seen in the sample layout:
// *tweets -message content -# of retweets -# of likes -date tweeted
// *friends -profile image -real name -screenname
// *messages -message body -date the message was sent -time the message was sent


