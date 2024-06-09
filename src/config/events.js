const fs = require("node:fs");
const { execSync } = require('child_process');
const utils = require('./utils');

function getTracksFilepath(release) {
    return "src/entries/tracklists/" + release + ".csv";
}
function generateTracksFileIfNonexistent(releaseName) {
    if (releaseName === '') {
        utils.handleError('Release without name detected! Double check releases.csv file.');
        return;
    }
    const filepath = getTracksFilepath(releaseName);
    if (!fs.existsSync(filepath)) {
        console.log("Generating file " + filepath);
        fs.writeFileSync(filepath, "name,links,intro,about", handleError);
    }
}

module.exports = eleventyConfig => {
    eleventyConfig.on('eleventy.before', () => {
        const records = fs.readFileSync("src/entries/releases.csv", utils.handleError);
        for (const release of utils.parseEntries(records)) {
            generateTracksFileIfNonexistent(release.name)
        }
    });
    eleventyConfig.on('eleventy.after', () => {
        execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' });
    });
}