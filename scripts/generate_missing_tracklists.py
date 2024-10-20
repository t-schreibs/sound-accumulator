import sys
import music_entries
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
    results = spotify.artist_albums(artist["uri"], album_type="album,single")
    releases = results["items"]
    while results["next"]:
        results = spotify.next(results)
        releases.extend(results["items"])
    current_releases = music_entries.get("release")
    for release in releases:
        release_type = utils.get_release_type(release)
        release_name = release["name"]
        release = spotify.album(release["uri"])
        release["album_type"] = release_type
        release["name"] = release_name
        if release_type == "single":
            release_name += " (single)"
        if not music_entries.get("track", release["name"]):
            music_entries.try_generate_tracklist(release["name"])
            results = spotify.album_tracks(release["uri"])
            tracks = results["items"]
            while results["next"]:
                results = spotify.next(results)
                tracks.extend(results["items"])
            utils.create_track_entries(
                tracks,
                release["name"],
            )
            print(f'Generated tracklist for {release["name"]}')
