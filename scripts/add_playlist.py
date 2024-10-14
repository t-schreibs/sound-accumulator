import sys
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import credentials
import utils

url = sys.argv[1]
clientCredentials = SpotifyClientCredentials(
    client_id = credentials.CLIENT_ID,
    client_secret = credentials.CLIENT_SECRET
);
spotify = spotipy.Spotify(client_credentials_manager=clientCredentials);
results = spotify.playlist_tracks(url)
entries = results['items']
while results['next']:
    results = spotify.next(results)
    entries.extend(results['items'])
artists = [];
for entry in entries:
    track = entry['track'];
    for artist in track['artists']:
        artists.append(artist);
uniqueArtists = [];
for artist in artists:
    if artist not in uniqueArtists:
        uniqueArtists.append(artist);
for artist in uniqueArtists:
    utils.scaffold_artist(artist, spotify);