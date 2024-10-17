const utils = require('../config/utils')
const fs = require("node:fs");

module.exports = function () {
    const artists = utils.parseEntries(fs.readFileSync("src/entries/artists.csv", utils.handleError)).map(
        artist => artist.name.toLowerCase()
    );
    const releases = utils.parseEntries(fs.readFileSync("src/entries/releases.csv", utils.handleError));
    const missingArtists = [...new Set(releases.map(
        entry => entry.artists.split(',')).flat().filter(
            artist => !(artist === '' || artists.includes(artist.toLowerCase()))
        ))];
    return missingArtists;
};