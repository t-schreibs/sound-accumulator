const fs = require("node:fs");
const { parse } = require('csv-parse/sync');
const striptags = require("striptags");
const markdownIt = require("markdown-it");
const htmlToText = require('html-to-text');

function getTracksFilepath(release) { 
  return "src/entries/tracklists/" + release + ".csv";
}
function replaceWikilinks(content) {
  return content.replace(/\[\[(.*?)\|(.*?)\]\]/gm, `<a href="/$1">$2</a>`)
    .replace(/\[\[(.*?)\]\]/gm, `<a href="/$1">$1</a>`);
}
function compareAlphabetically(a, b) {
    return a.data.title.localeCompare(b.data.title);
  }
  function parseEntries(contents) {
    return parse(contents, {
      columns: true,
      skip_empty_lines: true
    });
  }
  function handleError(err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  }
  function generateTracksFileIfNonexistent(releaseName)
  {
    const filepath = getTracksFilepath(releaseName);
    if (!fs.existsSync(filepath))
        {
          console.log("Generating file " + filepath);
          fs.writeFileSync(filepath, "name,links,intro,about", handleError);
        }
  }
  function textDescription(content) {
    md = new markdownIt();
    return htmlToText.convert(replaceWikilinks(md.renderInline(content)));
  }

  exports.getTracksFilepath = getTracksFilepath;
  exports.compareAlphabetically = compareAlphabetically;
  exports.parseEntries = parseEntries;
  exports.handleError = handleError;
  exports.generateTracksFileIfNonexistent = generateTracksFileIfNonexistent;
  exports.textDescription = textDescription;
  exports.replaceWikilinks = replaceWikilinks;