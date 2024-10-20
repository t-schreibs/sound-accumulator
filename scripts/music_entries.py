import csv
from pathlib import Path
from urllib.parse import quote

ENTRIES_PATH = (Path.cwd() / "src" / "entries").resolve()


def get(type, release=None):
    filepath = get_filepath(type, release)
    try:
        with open(filepath, newline="", encoding="utf-8") as file:
            return list(csv.reader(file))[1:]
    except:
        return list()


def add(type, entries, release=None):
    filepath = get_filepath(type, release)
    with open(filepath, "a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerows(entries)


def try_generate_tracklist(release):
    filepath = get_filepath("track", release)
    try:
        with open(filepath, "x", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerows([["name", "links", "intro", "about"]])
        return True
    except:
        return False


def get_filepath(type, release=None):
    match type:
        case "artist":
            return Path.joinpath(ENTRIES_PATH, "artists.csv")
        case "genre":
            return Path.joinpath(ENTRIES_PATH, "genres.csv")
        case "release":
            return Path.joinpath(ENTRIES_PATH, "releases.csv")
        case "track":
            return Path.joinpath(
                ENTRIES_PATH, "tracklists", f"{get_clean_filename(release)}.csv"
            )
        case _:
            raise Exception(f"Entry type {type} not supported.")


def get_clean_filename(filename):
    return quote(filename, " ,()!+")
