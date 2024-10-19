import blogging
from datetime import date
from colorist import red

blog_date = date.today().strftime("%d %B %Y")
post = blogging.start_post(blog_date)
blogging.add_artist_list(post, blogging.get_artists_to_include_in_next_post())
try:
    with open(blogging.get_filepath(blog_date), "x") as file:
        file.write(post.write())
    print(f"Generated post for {blog_date}")
except:
    red(f"Failed to generate post for {blog_date}")
    red("Does the post already exist?")
