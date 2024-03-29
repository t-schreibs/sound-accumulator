---
title: Contribute
tags: ['meta']
excludeFromRecent: true
---

## Get involved!

Sound Accumulator is always looking for new submissions. Want to feature your band's music? Want to help a local artist out? Enjoy this space and looking for a way to give back? Consider contributing to the [repository](https://github.com/t-schreibs/sound-accumulator).

## Contributing to the GitHub repository

In order to submit to the project, you will need to [create a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks#forking-a-repository-versus-duplicating-a-repository) of the [main repository](https://github.com/t-schreibs/sound-accumulator), add content to your fork, and then [generate a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) for the [main branch](https://github.com/t-schreibs/sound-accumulator/tree/main) of the repository. A general overview of the workflow would look something like this:

1. Make sure you have a GitHub account and are currently logged into it
2. Navigate to the [sound-accumulator repository](https://github.com/t-schreibs/sound-accumulator) on GitHub
3. At the top of the page, select "Fork", and generate a fork of the repository on your profile
    - You do _not_ need to copy all branches - the only one you should be adding changes to is the main one
4. Using whatever method works for you, add .md files to the subfolders underneath the "content" folder in the main branch of your fork
    - You can technically do this directly in the GitHub web app, but it is _highly_ recommended that you instead download [Obsidian](https://obsidian.md/download) and install the [Sound Accumulator Tools plugin](https://github.com/t-schreibs/sound-accumulator-tools) to create your entries. More on this below.
    - Submitted files must meet the submission guidelines as outlined in the following section of this guide
    - You will need to use Git to commit your files to your fork, but if you're unfamiliar, both GitHub (natively) and Obsidian (via a [plugin](https://github.com/denolehov/obsidian-git)) have a simple GUI interface for doing that
5. Once you are happy with the content you've created, it's time to submit your pull request
    - Navigate to the ["Pull requests" tab](https://github.com/t-schreibs/sound-accumulator/pulls) of the sound-accumulator repository
    - Click "New pull request" at the top of the page, and create a pull request with the edited branch of your fork as the *compare* branch and the main branch of the main repo as the *base* branch
6. Your pull request will be reviewed by the project maintainers
    - In some instances, the pull request will be outright rejected - see the submission guidelines below for more information on this
    - Some suggestions may or may not be provided - they will be marked as either optional or required
    - To complete the process, make all required changes and implement whatever optional suggestions you feel are worthwhile
    - The pull request will be accepted by the maintainers, and your submission will go live!
7. Sit back and admire your handiwork

## Submission guidelines

> [!info] FYI
>
> These guidelines are a work in progress - please consult this guide for the latest & greatest before submitting.

1. No more than one artist is to be represented in each pull request - this keeps the complexity of review to a minimum
    - Multiple albums may be submitted per pull request, but they must be associated with a single artist
    - Genre submissions may either be done in separate pull requests, or in the same pull request as an associated artist
2. Artists must _not_ be internationally famous, and even somewhat well-known artists are likely to be rejected
    - This resource is primarily geared toward exposure for small and local acts
    - Does the artist you're looking to submit have more than a million streams for a single track on Spotify? They're probably too well-known for Sound Accumulator
    - You have the right to argue on behalf of "gray-area" mid-tier artists, but please be aware that the maintainers are not easily swayed! All final decisions are made with the intent of supporting small & local artists, and this does mean that some submissions might be unexpectedly rejected
    - Rejections are not a form of discipline - we often learn about cool acts through rejected submissions! But they are used to help keep the site focused
3. Submissions should closely follow the [templates provided in the repository](https://github.com/t-schreibs/sound-accumulator/tree/hugo/content/templates)
    - Replace parenthesized text with content
    - Where the words "link" or "links" are included in the parenthesized text, provide links as appropriate
    - All links, whether internal (meaning, links across Sound Accumulator) or external (meaning, links to another site) should be handled as either [Obsidian-style Wikilinks](https://help.obsidian.md/Linking+notes+and+files/Internal+links#Supported+formats+for+internal+links) or [Markdown links](https://www.markdownguide.org/basic-syntax/#links)
    - Info tables live in the frontmatter of posts, under the field "table"
	    - Unused rows from the info tables may be removed, but please don't add new rows - any additional information should be submitted in the "About" section
	    - Multiple artists may be linked in the info table of a single release, as can multiple releases in the table of a single track
    - Releases have a special second table in their frontmatter under the field "tracks", for enumerating the individual tracks in the release
	    - Each track must have, at a minimum, a "name" field filled out. Additionally, they may each be provided with an "intro", "about", and "links" field
1. All submissions should be placed in the correct folder
    - Submissions live in subfolders of the [content folder](https://github.com/t-schreibs/sound-accumulator/tree/main/content):
        - Artists in [content/artists](https://github.com/t-schreibs/sound-accumulator/tree/main/content/artists)
        - Albums, EPs, singles in [content/releases](https://github.com/t-schreibs/sound-accumulator/tree/main/content/releases)
        - Genres in [content/genres](https://github.com/t-schreibs/sound-accumulator/tree/main/content/genres)
        - Release submissions should be grouped inside of subfolders labeled with the artist's name
        - In the event that multiple artists contributed to a release (such as in the form of a compilation or collaboration), a primary artist should be selected for the submission, and the submission can then be organized in the folders accordingly
2. Focus on linking!
    - While there are defined sections for certain kinds of links (genre links, artist links, etc. in the info tables), internal links should be peppered liberally throughout the "Intro" and "About" sections of any submission
    - Links are how users find music on this site - without links, your submissions will disappear into the void
3. Keep the tone concise and generally neutral, but a degree of conversationality is permitted, and fun & interesting comparisons to other artists, albums, tracks, or genres are condoned and even encouraged
    - Keep strong opinions to the [discussion boards](https://github.com/t-schreibs/sound-accumulator/discussions) - Sound Accumulator is not a review site
4. All submissions must at a minimum meet the Quartz [citizen code of conduct](https://github.com/t-schreibs/sound-accumulator/blob/main/CODE_OF_CONDUCT.md) - and that goes for both the music/artists submitted and the way in which they are represented
    - This site is not Wikipedia, and its intention is not to catalog all notable music
    - Sound Accumulator is committed to fostering an open & inclusive community of audiophiles, while increasing exposure for small & local artists

## Obsidian and the Sound Accumulator Tools plugin

Obsidian was selected as the application of choice for managing and generating Sound Accumulator submissions mostly because of its native abilities such as ease of navigation, robust linking support, and Markdown rendering capabilities. Vanilla Obsidian is powerful. However, given Sound Accumulator's specific requirements, a plugin was created to add a couple of niceties that make working with the repository a bit friendlier. A couple features the plugin adds:
- You can set a keyboard shortcut (usually ctrl+l) to quickly search for and link to files from within the body of a post while in Edit mode.
- Info tables are rendered into the body of the post when in Preview mode

## FAQ

### Can I include images in my submissions?

Image files may not be included in pull requests, and will be removed. Sound Accumulator is a text and link-based site, and images are far too expensive in terms of both performance and storage. However, links to media on other sites are encouraged, such as to [Bandcamp](https://bandcamp.com) and [Spotify](https://open.spotify.com).

### Will an artist that has become too popular for Sound Accumulator have their submissions removed?

Currently, there's no plan for this to happen, but if it does start to become a repeat problem, a process will likely be instituted to "graduate" artists from the platform.

### How do I become a maintainer for the project?

When a need is determined by the current maintainers to increase capacity, contributors with the most activity will be considered.

### Are pull requests accepted for core site functionality?

Yes, but please keep in mind that the site is built to be simple and fast - anything that compromises either of these aims will likely be rejected.

### What is Quartz?

[Quartz](https://quartz.jzhao.xyz) is the engine under the hood that transforms our simple Markdown files into a full-fledged website!

## Thanks, everybody! 

Our contributors are what make this a fun & interesting little corner of the internet.