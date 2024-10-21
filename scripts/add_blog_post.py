import sys
import blogging
from datetime import date
from colorist import red

description = sys.argv[1]
blog_date = date.today().strftime("%B %d, %Y")
artists = blogging.get_artists_to_include_in_next_post()
post = blogging.start_post(blog_date, description, artists)
blogging.add_stats(post)
blogging.add_break(post)
blogging.add_artist_list(post, artists)
try:
    with open(blogging.get_filepath(blog_date), "x", newline="", encoding="utf-8") as file:
        file.write(post.write())
    print(f"Generated post for {blog_date}")
except:
    red(f"Failed to generate post for {blog_date}")
    red("Does the post already exist?")
