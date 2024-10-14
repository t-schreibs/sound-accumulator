import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import credentials
import music_entries

def try_scaffold_artist(artist, spotify):
    current_artists = music_entries.get('artist');
    if exists(artist['name'], current_artists):
        return False;
    create_artist_entry(artist);
    results = spotify.artist_albums(artist['uri'], album_type='album,single');
    releases = results['items'];
    while results['next']:
        results = spotify.next(results);
        releases.extend(results['items']);
    current_releases = music_entries.get('release');
    for release in releases:
        if not exists(release['name'], current_releases):
            create_release_entry(release);
            results = spotify.album_tracks(release['uri']);
            tracks = results['items'];
            while results['next']:
                results = spotify.next(results);
                tracks.extend(results['items']);
            create_track_entries(tracks, release['name']);
    return True;

def get_spotify_client():
    clientCredentials = SpotifyClientCredentials(
        client_id = credentials.CLIENT_ID,
        client_secret = credentials.CLIENT_SECRET
    );
    return spotipy.Spotify(client_credentials_manager=clientCredentials);

def exists(name, entries):
    return sum(1 for entry in entries if entry[0] == name);

def create_artist_entry(artist):
    entry = [artist['name'], '', '', ','.join(artist['genres']), '', artist['external_urls']['spotify'], '', artist['about']];
    entries = [entry];
    music_entries.add('artist', entries);

def create_release_entry(release):
    entry = [release['name'], ','.join(release['artists'].map(lambda artist: artist['name'])), ','.join(release['genres']), 
             get_release_type(release['type']), release['release_date'], release['external_urls']['spotify'], '', ''];
    entries = [entry];
    music_entries.add('release', entries);
    music_entries.generate_tracklist(release['name']);

def create_track_entries(tracks, release):
    entries = [];
    for track in tracks:
        entry = [track['name'], track['external_urls']['spotify'], '', ''];
        entries.append(entry);
    music_entries.add('track', entries, release);

def get_release_type(type):
    match type:
        case 'single':
            return 'single';
        case _:
            return 'LP';