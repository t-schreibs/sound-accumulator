import sys
import utils

url = sys.argv[1];
spotify = utils.get_spotify_client();
artist = spotify.artist(url);
if utils.try_scaffold_artist(artist, spotify):
    print(f'Generated entries for {artist['name']}');
else:
    print(f'Skipped {artist['name']}');