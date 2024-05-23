const fs = require("node:fs");
const { parse } = require('csv-parse/sync');

function getTracksFilepath(release) { 
  return "src/entries/tracklists/" + release + ".csv";
}
function compareAlphabetically(a, b) {
    if (a.data.title < b.data.title) {
      return -1;
    }
    if (a.data.title > b.data.title) {
      return 1;
    }
    return 0;
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

  exports.getTracksFilepath = getTracksFilepath;
  exports.compareAlphabetically = compareAlphabetically;
  exports.parseEntries = parseEntries;
  exports.handleError = handleError;
  exports.generateTracksFileIfNonexistent = generateTracksFileIfNonexistent;