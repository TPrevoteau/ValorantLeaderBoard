'use strict';
const https = require('https');

module.exports = function (CONFIG) {
    this.riotToken = CONFIG.riot.riotToken;

    this.getCurrentActId = function (callback) {
        this.getContent(function (data) {
            var actsList = data.acts;
            var currentAct = actsList.find(act => act.isActive && act.type == 'act');
            if (currentAct) {
                console.log('this is current act id : ', currentAct.id);
                callback(currentAct.id);
            }
        });
    }
    this.getContent = function (callback) {
        var path = CONFIG.riot.api.content.path + '?locale=' + CONFIG.riot.api.content.local
        const options = {
            hostname: CONFIG.riot.api.host,
            port: CONFIG.riot.api.port,
            path: path,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0',
                'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
                'X-Riot-Token': this.riotToken
            }
        }

        const req = https.request(options, res => {
            console.log(`getContent statusCode: ${res.statusCode}`);
            var data = '';

            res.on('data', d => {
                data += d;
            })

            res.on('end', () => {
                if (callback) callback(JSON.parse(data));
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end();
    }
    this.getRanked = function (actId, callback) {
        var path = CONFIG.riot.api.ranked.path + actId;
        path += '?size=' + CONFIG.riot.api.ranked.size + '&startIndex=' + CONFIG.riot.api.ranked.start;
        const options = {
            hostname: CONFIG.riot.api.host,
            port: CONFIG.riot.api.port,
            path: path,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0',
                'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
                'X-Riot-Token': this.riotToken
            }
        }

        const req = https.request(options, res => {
            console.log(`getRanked statusCode: ${res.statusCode}`);
            var data = '';

            res.on('data', d => {
                data += d;
            })

            res.on('end', () => {
                if(callback) callback(JSON.parse(data));
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end();
    }
}