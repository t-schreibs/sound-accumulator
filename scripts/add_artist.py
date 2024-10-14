import sys
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import credentials
import utils

url = sys.argv[1];
clientCredentials = SpotifyClientCredentials(
    client_id = credentials.CLIENT_ID,
    client_secret = credentials.CLIENT_SECRET
);
spotify = spotipy.Spotify(client_credentials_manager=clientCredentials);
artist = spotify.artist(url);
utils.scaffold_artist(artist, spotify);