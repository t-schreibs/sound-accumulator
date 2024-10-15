from pathlib import Path
from markdownmaker.document import Document
from markdownmaker.markdownmaker import *
import frontmatter
import music_entries
import os

BLOG_PATH = (Path.cwd() / "src" / "pages" / "blog").resolve();

def start_post(date):
    post = Document();
    post.add('---');
    post.add(f'title: "{date}"');
    post.add('tags: blog');
    post.add('description: ""');
    post.add('permalink: "blog/{{ title | slugify }}/"');
    post.add('---');
    post.add('');
    return post;

def add_artist_list(post, artists):
    with HeaderSubLevel(post):
        post.add(Header("Artists"))
        post.add('');
        links = [f'[[artists/{artist}|{artist}]]' for artist in artists];
        post.add(UnorderedList(links));

def get_filepath(post_name, include_extension=True):
    return Path.joinpath(BLOG_PATH, f'{post_name}{'.md' if include_extension else ''}');

def get_artists_to_include_in_next_post():
    artists = [artist[0] for artist in music_entries.get('artist')];
    artists_to_exclude = [];
    for filename in os.listdir(BLOG_PATH):
        with open(get_filepath(filename, False), "r") as file:
            post = frontmatter.load(file);
            if ('artists' in post.keys()):
                artists_to_exclude.extend(post['artists']);
    return [artist for artist in artists if artist not in artists_to_exclude];
