
function login(onTokenReceived) {
    return new Promise(function (resolve, reject) {
        OAuthManager.obtainToken({
          scopes: [
              'playlist-read-private',
              'playlist-modify-public',
              'playlist-modify-private'
            ]
          }).then(function(token) {
            resolve(onTokenReceived(token));
          }).catch(function(error) {
            console.error(error);
          });
      });
}

function onTokenReceived(accessToken) {
    return new Promise(function (resolve, reject) {
        //artistInfoModel.isLoggedIn(true);
        //spotifyWebApi.setAccessToken(accessToken);
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('token_expires', (new Date()).getTime() + 3600 * 1000); // 1 hour
        // spotifyWebApi.getMe().then(function(data){
        //     artistInfoModel.userId(data.id);
        //     artistInfoModel.displayName(getDisplayName(data.display_name));
        //     artistInfoModel.userImage(data.images[0].url);
        //     localStorage.setItem('ae_userid', data.id);
        //     localStorage.setItem('ae_display_name', data.display_name);
        //     localStorage.setItem('ae_user_image', data.images[0].url);
        //     currentApi = spotifyWebApi;
        //     resolve(checkArtistExplorerPlaylistExists(artistInfoModel.userId(), 0, 50));
        // });

    });
}

$(function() {
    let spotifyApi = new SpotifyWebApi()

    $("#loginButton").on("click", function() {
        login(function(accessToken) {
            console.log("Logged in")
            spotifyApi.setAccessToken(accessToken)
            $("#loginButton").hide()
            $("#logoutButton").show()
        })
    })
    $("#logoutButton").on("click", function() {
        $("#logoutButton").hide()
        $("#loginButton").show()    
    })
})