def scaffold_artist(artist, spotify):
    results = spotify.artist_albums(artist['uri'], album_type='album,single');
    albums = results['items'];
    while results['next']:
        results = spotify.next(results);
        albums.extend(results['items']);
    for album in albums:
        print(album['name']);