module.exports = {
    riot: {
        riotToken: 'Put here your riot token',
        api: {
            host: 'eu.api.riotgames.com',
            port: 443,
            ranked: {
                path: '/val/ranked/v1/leaderboards/by-act/',
                size: 6,
                start: 0
            },
            content: {
                path: '/val/content/v1/contents',
                local: 'en-GB'
            }
        }
    },
    twitter: {
        api: {
            auth: {
                consumer_key: 'Put here your twitter consumer key',  
                consumer_secret: 'Put here your twitter consumer secret key',
                access_token_key: 'Put here your twitter token key',  
                access_token_secret: 'Put here your twitter token secret key'
            }
        }
    },
    region: 'EU'
};