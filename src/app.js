'use strict';
var Valorant = require('./riot/valorant');
var Twitter = require('./twitter/tweet');
const CONFIG = require('../config');

exports.handler = (event, context, callback) => {
    var valorant = new Valorant(CONFIG);
    var twitter = new Twitter(CONFIG);
    
    valorant.getCurrentActId(function (currentActId) {
        valorant.getRanked(currentActId, function(data) {
            twitter.tweet(data);
        });
    });
};
