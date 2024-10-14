import sys
import utils

url = sys.argv[1];
spotify = utils.get_spotify_client();
artist = spotify.artist(url);
utils.try_scaffold_artist(artist, spotify);