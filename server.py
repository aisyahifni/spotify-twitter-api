from flask import Flask, request, render_template
import json
import re
from twitter import Twitter
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth

client_id = '28219d5f84fe4c848b86bbe5c97b2c45'
client_secret = 'e0fde5116534469b9a6e49dd28e24469'

spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id, client_secret))

regex = re.compile(r"#nowplaying", re.IGNORECASE)

app = Flask(__name__)
twitter = Twitter()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/callback.thml')
def callback():
    return render_template('callback.html')

@app.route('/api/search')
def search():
    hashtag = request.args.get('hashtag', '#nowplaying')
    username = request.args.get('username', 'aisyahtest')
    tweets = twitter.search(hashtag, username)
    tracks = []

# my_stopwords = ['via', 'by', 'on', 'from', 'at', "Listen from", "Listening to", "Live at", 
#                 'with', 'listen', 'live', "i'm", 'to', 'tunein', 'tune', 'in', 'now', 'performed', 'for']

# def remove_mystopwords(sentence):
#     tokens = sentence.split(" ")
#     tokens_filtered= [word for word in text_tokens if not word in my_stopwords]
#     return (" ").join(tokens_filtered)

    for tweet in tweets:
        query = re.sub('#nowplaying', '', tweet.text, flags=re.IGNORECASE)
        results = spotify.search(q=query, type='track')
        tracks.append(results['tracks']['items'][0])

    return json.dumps(tracks)

if __name__ == '__main__':
    app.run(host='0.0.0.0')