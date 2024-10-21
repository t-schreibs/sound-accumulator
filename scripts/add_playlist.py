import sys
import utils

url = sys.argv[1]
spotify = utils.get_spotify_client()
results = spotify.playlist_tracks(url)
entries = results["items"]
while results["next"]:
    results = spotify.next(results)
    entries.extend(results["items"])
artists = []
for entry in entries:
    track = entry["track"]
    for artist in track["artists"]:
        artists.append(spotify.artist(artist["uri"]))
uniqueArtists = []
for artist in artists:
    if artist not in uniqueArtists:
        uniqueArtists.append(artist)
for artist in uniqueArtists:
    if utils.try_scaffold_artist(artist, spotify):
        print(f"Generated new entries for {artist['name']}")
    else:
        print(f"No new entries for {artist['name']}")
