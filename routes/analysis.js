var express = require('express');
var logger = require('../helpers/logger.js');
var twitter_scores = require('../helpers/scores/twitter-scores.js');
var signalHue = require('../helpers/hue.js');
var lampStateMapper = require('../helpers/lampstate-mapper.js');

var router = express.Router();

router.get('/twitter-score/:searchTerm', function(req, res, next) {
    searchTerm = req.params.searchTerm;
    logger.info("Request param is " + searchTerm);

    if(twitter_scores == undefined) {
        res.statusCode = 500;
        res.send("INTERNAL SERVER ERROR - Unable to load twitter-scores module");
    }

    var score = twitter_scores(searchTerm).then(function(score) {

        var analysis = analyzeScore(Math.round(score * 1000) / 1000);
        logger.info("Determined analysis for searchTerm [" + searchTerm + "] as " + analysis);
        signalHue(lampStateMapper(analysis));

        res.contentType('text/plain');
        res.send(analysis);
    });
});

var analyzeScore = function(score) {
    if(!score) {
        return "DEFAULT";
    }

    if(score <= 0.400) {
        return "NEGATIVE";
    }

    if(score <= 0.700) {
        return "NEUTRAL";
    }

    return "POSITIVE";
};

module.exports = router;
