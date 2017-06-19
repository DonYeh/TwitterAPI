'use strict';

const express = require('express');
const app = express();

const config = require('./config.js');
const routes = require('./routes/index');
//const path = require('path');

const Twit = require('twit');
const T = new Twit(config);

const pug = require('pug');
//set folder structure for middleware to be able to call stylesheets...set up pug templates
app.use('/static', express.static(__dirname + '/public'));
//set view engine to serve middleware.......pug template engine
// app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
//set where to look for templates.....template directory
app.set('views', __dirname + '/views');

//app.set('views', path.join(__dirname + '/views'));

app.use('/', routes);

// Home Route
app.get('/', function(req, res) {
    
  res.send('Hello World, testing nodemon');


    const profileRequest = T.get('account/verify_credentials');
    
    const tweetsRequest = T.get('statuses/user_timeline', { screen_name: 'DonaldLYeh', count: 5 },function (err, data, response) {
        //console.log(data);
         //console.log(data[0].user.text);
    }).catch(function (err) {
        console.log('caught error', err.stack)
        })
    .then(function (result) {
    //tweets: message content, # of tweets, # of likes, date tweeted
        console.log('testing1', result.data[1].user.id); // display twitter profile name
        // console.log('testing2', result.data[2].retweet_count); //# of tweets
        // console.log('testing3', result.data[2].favorite_count); //# of likes
        // console.log('testing4', result.data[2].text); //text 
        // console.log('testing5', result.data[2].created_at); //date tweeted (returns string) 
        //console.log('testing6', result.data);
    });

    const friendsRequest = T.get('friends/list', { screen_name: 'DonaldLYeh', count: 5 },function (err, data, response) {
    //console.log(data.users[1].name);
    }).catch(function (err) {
        console.log('caught error', err.stack);
        })
    .then(function (result) {
   //friends: profile-image, real name, screenname
        
        //console.log('testing6', result);
        console.log('testing7', result.data.users[0].name); // display real name
        console.log('testing8', result.data.users[0].screen_name); //display  screenname
        //console.log('testing3', result.data.users[0].profile_image_url_https: currentValue.profile_image_url_https); //profile image
    });
    
    const messagesRequest = T.get('direct_messages/sent', { screen_name: 'DonaldLYeh', count: 5 },function (err, data, response) {
        //console.log('TESTING messages request');
    }).catch(function (err) {
    console.log('caught error', err.stack);
  })
  .then(function (result) {
   //messages: message body, date the message was sent, time the message was sent
    console.log('testing9', result.data[0].text);  //display message body
    //console.log('testing10', result.data[0].created_at); // display date 0
    //console.log('testing10', result.data.users[0].screen_name); //display  screenname
    //console.log('testing3', result.data.users[0].profile_image_url_https: currentValue.profile_image_url_https); //profile image
  }); //then

//res.render('index', { title: "testing render 2", message: "this is a temp message 2"});

}); //app.get


// Start web server on port 3000
app.listen(3000, () => {
    console.log(`The frontend server is running on port 3000...`);
});


//Using Node and Express, request the data you need from Twitter’s API, render it in your template, and send it to the client at the “/” route. Please avoid using Express generator to set up this project. It will be good practice to set up a simple Express app yourself!
// Each rendered result must include all of the information seen in the sample layout:
// *tweets -message content -# of retweets -# of likes -date tweeted
// *friends -profile image -real name -screenname
// *messages -message body -date the message was sent -time the message was sent



// T.get('account/verify_credentials', { skip_status: true })
//   .catch(function (err) {
//     console.log('caught error', err.stack)
//   })
//   .then(function (result) {
//     // `result` is an Object with keys "data" and "resp". 
//     // `data` and `resp` are the same objects as the ones passed 
//     // to the callback. 
//     // See https://github.com/ttezel/twit#tgetpath-params-callback 
//     // for details. 
 
//     console.log('data', result.data);
//   })



