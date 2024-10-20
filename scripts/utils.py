import sys
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import credentials
import music_entries
from colorist import red


def try_scaffold_artist(artist, spotify):
    result = False
    current_artists = music_entries.get("artist")
    if not exists(artist["name"], current_artists):
        create_artist_entry(artist)
        result = True
    results = spotify.artist_albums(artist["uri"], album_type="album,single")
    releases = results["items"]
    while results["next"]:
        results = spotify.next(results)
        releases.extend(results["items"])
    current_releases = music_entries.get("release")
    for release in releases:
        release_type = get_release_type(release)
        release_name = release["name"]
        if release_type == "single":
            release_name += " (single)"
        if not exists(release_name, current_releases):
            release = spotify.album(release["uri"])
            release["album_type"] = release_type
            release["name"] = release_name
            create_release_entry(release, artist["genres"])
            results = spotify.album_tracks(release["uri"])
            tracks = results["items"]
            while results["next"]:
                results = spotify.next(results)
                tracks.extend(results["items"])
            create_track_entries(
                tracks,
                release["name"],
            )
            result = True
    return result


def get_spotify_client():
    clientCredentials = SpotifyClientCredentials(
        client_id=credentials.CLIENT_ID, client_secret=credentials.CLIENT_SECRET
    )
    return spotipy.Spotify(client_credentials_manager=clientCredentials)


def exists(name, entries):
    return sum(1 for entry in entries if entry[0].lower() == name.lower())


def create_artist_entry(artist):
    entry = [
        artist["name"],
        "",
        "",
        ",".join(capitalize_each(artist["genres"])),
        artist["external_urls"]["spotify"],
        "",
        "",
    ]
    entries = [entry]
    music_entries.add("artist", entries)


def create_release_entry(release, default_genres):
    entry = [
        release["name"],
        ",".join([artist["name"] for artist in release["artists"]]),
        ",".join(
            capitalize_each(release["genres"] if release["genres"] else default_genres)
        ),
        release["album_type"],
        release["release_date"],
        release["external_urls"]["spotify"],
        "",
        "",
    ]
    entries = [entry]
    music_entries.add("release", entries)
    if not music_entries.try_generate_tracklist(release["name"]):
        red(
            f"Could not generate tracklist for {release['name']}. Is this a duplicate entry?"
        )


def create_track_entries(tracks, release):
    entries = []
    current_tracks = music_entries.get("track", release)
    for track in tracks:
        if not exists(track["name"], current_tracks):
            entry = [track["name"], track["external_urls"]["spotify"], "", ""]
            entries.append(entry)
    if entries:
        music_entries.add("track", entries, release)


def get_release_type(release):
    match release["album_type"]:
        case "single":
            return "single" if release["total_tracks"] < 4 else "EP"
        case _:
            return "LP"


def capitalize_each(list):
    return [entry.capitalize() for entry in list]
