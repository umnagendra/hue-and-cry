// CONSTANTS
var HAPPY_PARAM         = " :)";
var SAD_PARAM           = " :(";
var TWITTER_RESULT_TYPE = 'recent';
var TWITTER_COUNT       = 30;
var TWITTER_SINCE       = "since:";

var logger = require('../logger.js');
var Twitter = require('twitter');

var twitterClient = new Twitter({
    consumer_key: '<YOUR_CONSUMER_KEY>',
    consumer_secret: '<YOUR_CONSUMER_SECRET>',
    access_token_key: '<YOUR_ACCESS_TOKEN>',
    access_token_secret: '<YOUR_ACCESS_TOKEN_SECRET>'
});

var twitter_scores = function(searchTerm) {
        var positiveScorePromise = getTwitterScore(searchTerm + HAPPY_PARAM);
        var negativeScorePromise = getTwitterScore(searchTerm + SAD_PARAM);

        return Promise.all([positiveScorePromise, negativeScorePromise]).then(function(scores) {
            var positiveScore = scores[0];
            var negativeScore = scores[1] * 2;

            var score = positiveScore / (positiveScore + negativeScore);
            logger.info("For searchTerm [" + searchTerm + "], +ve score = " + positiveScore + ", -ve score = " + negativeScore + ". OVERALL SCORE = " + score);
            return score;
        });
};

var getTwitterScore = function (searchTerm) {
    return new Promise(function(resolve, reject) {
        twitterClient.get('search/tweets', createParams(searchTerm), function(error, tweets, response){
            logger.info(tweets);
            logger.info(error);

            if (tweets && tweets.statuses) {
                resolve(tweets.statuses.length);
            } else {
                logger.info("No tweets found for searchTerm [" + searchTerm + "]");
                resolve(-1);
            }
        });
    });


    twitterClient.get('search/tweets', createParams(searchTerm), function(error, tweets, response){
        logger.info(tweets);

        if (tweets && tweets.statuses) {
            return tweets.statuses.length;
        }

        logger.info("No tweets found for searchTerm [" + searchTerm + "]");
        return -1;
    });
};

var createParams = function (searchTerm) {
    var params = {};
    params.q = searchTerm + " " + TWITTER_SINCE + getCurrentDate();
    params.result_type = TWITTER_RESULT_TYPE;
    params.count = TWITTER_COUNT;
    return params;
};

var getCurrentDate = function () {
    var now = new Date();
    var thisYear = now.getFullYear();
    var thisMonth = now.getMonth() + 1;
    var thisDate = now.getDate();
    return thisYear + "-" + thisMonth + "-" + thisDate;
};

exports = module.exports = twitter_scores;