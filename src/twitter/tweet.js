'use strict';
var Twitter = require('twitter');

module.exports = function (CONFIG) {
    this.tweet = function (data) {
        var tweetText = this.parseData(data);
        
        var client = new Twitter(CONFIG.twitter.api.auth);
        client.post('statuses/update', {status: tweetText}, function (error, tweet, response) {
            if (error) throw error;
            console.log(tweet);
        })
    },

    this.parseData = function (data) {
        var parsedData = `These are the players with the highest ranked ratings in ${CONFIG.region} today :`;
        var num = 1;
        data.players.forEach(player => {
            parsedData += '\n';
            switch (num) {
                case 1:
                    parsedData += '🥇 ';
                    num++;
                    break;
                case 2:
                    parsedData += '🥈 ';
                    num++;
                    break;
                case 3:
                    parsedData += '🥉 ';
                    num++;
                    break;
                default:
                    parsedData += '🏅 ';
                    num++;
                    break;
            }
            parsedData += player.gameName;
            parsedData += ' - ' + player.rankedRating;
        });
        return parsedData;
    }
}