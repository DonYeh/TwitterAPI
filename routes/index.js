const express = require('express');
const router = express.Router();

const config = require('../config.js');

const Twit = require('twit');
const T = new Twit(config);
  
//handle GET requests to the '/' route
router.get('/', (req, res) => {
 
    const userProfile =	T.get('account/verify_credentials');
    const tweetsPromise = T.get('statuses/home_timeline', {count: 5}); //promise to get tweets
    const sentMessagesPromise =	T.get('direct_messages/sent', { count: 5}); //promise to get sent messages
    const friendsPromise =	T.get('friends/list', { count: 5}); //promise to get friends list

    const arrayOfPromises = [userProfile,tweetsPromise,sentMessagesPromise,friendsPromise]; // array of promises 
    Promise.all(arrayOfPromises).then((arrayOfPromisesResolved) => {	//once all promises are resolved, create a new promise		
                                                                                                                                                            //i can render all togheter
    let userName = arrayOfPromisesResolved[0].data.screen_name;			//store promise results
    let url = arrayOfPromisesResolved[0].data.profile_image_url;
    let banner = arrayOfPromisesResolved[0].data.profile_banner_url;
    let followers = arrayOfPromisesResolved[0].data.followers_count;

    let tweets = arrayOfPromisesResolved[1].data;   //store tweets
    let tweetsData = []; 
    tweets.forEach((value, key ,array) => { 
        tweetsData.push({   //push key:values into tweetsData object
            tweetScreenName : value.user.screen_name,
            tweetUserName : value.user.name,
            tweetImg : value.user.profile_image_url,
            text : value.text,
            favorite : value.favorite_count,
            dateTweet : value.created_at.substring(3, 16),
            retweet : value.retweet_count,
            }); //end push
        }); //end forEach

    let messages = arrayOfPromisesResolved[2].data; //I set message in the variable with the route data of messages

    let friends = arrayOfPromisesResolved[3].data.users; //array o

    res.render('index', {  //render index.pug
        // message: "testing the index render",
        // title: "testing render",
        userName : userName,
        url : url,
        banner : banner,
        followers : followers,
        tweetsData : tweetsData,
        friends : friends,
        messages : messages
        }); //end render

    }).catch( (err) => { //if any promise fails, send error message
        let error = new Error(err);
        res.send(error);
    }); //end catch

}); //router.get

module.exports = router;