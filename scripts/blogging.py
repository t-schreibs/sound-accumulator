from pathlib import Path
from markdownmaker.document import Document
from markdownmaker.markdownmaker import *
import frontmatter
import music_entries
import os

BLOG_PATH = (Path.cwd() / "src" / "pages" / "blog").resolve()


def start_post(date, description, artists):
    post = Document()
    post.add("---")
    post.add(f'title: "{date}"')
    post.add("tags: blog")
    post.add(f'description: "{description}"')
    post.add('permalink: "blog/{{ title | slugify }}/"')
    post.add(f'artists: [{", ".join([f'"{artist[0]}"' for artist in artists])}]')
    post.add("---")
    post.add("")
    return post


def add_stats(post):
    with HeaderSubLevel(post):
        post.add(Header("New stats"))
        post.add("")
        post.add(
            Paragraph(f'{Bold("Total genres:")} {str(len(music_entries.get("genre")))}')
        )
        post.add(
            Paragraph(
                f'{Bold("Total artists:")} {str(len(music_entries.get("artist")))}'
            )
        )
        post.add(
            Paragraph(
                f'{Bold("Total releases:")} {str(len(music_entries.get("release")))}'
            )
        )


def add_artist_list(post, artists):
    with HeaderSubLevel(post):
        post.add(Header("New artists"))
        post.add("")
        links = [
            f"[[artists/{artist[0]}|{artist[0]}]] - {artist[5]}" for artist in artists
        ]
        post.add(UnorderedList(links))


def add_break(post):
    post.add("<br>")
    post.add("")


def get_filepath(post_name, include_extension=True):
    return Path.joinpath(BLOG_PATH, f"{post_name}{'.md' if include_extension else ''}")


def get_artists_to_include_in_next_post():
    artists = music_entries.get("artist")
    artists_to_exclude = []
    for filename in os.listdir(BLOG_PATH):
        with open(
            get_filepath(filename, False), "r", newline="", encoding="utf-8"
        ) as file:
            post = frontmatter.load(file)
            if "artists" in post.keys():
                artists_to_exclude.extend(post["artists"])
    return [artist for artist in artists if artist[0] not in artists_to_exclude]
