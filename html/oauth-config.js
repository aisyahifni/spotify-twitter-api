var OAuthConfig = (function() {
    'use strict';
  
    var clientId = '28219d5f84fe4c848b86bbe5c97b2c45';
    var redirectUri;
    if (location.host === 'localhost:5500') {
      redirectUri = 'http://localhost:5500/callback.html';
    } else {
      redirectUri = 'https://artistexplorer.spotify.com/callback.html';
    }
    var host = /http[s]?:\/\/[^/]+/.exec(redirectUri)[0];
    return {
      clientId: clientId,
      redirectUri: redirectUri,
      host: host
    };
  })();