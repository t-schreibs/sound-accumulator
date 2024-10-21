const utils = require('../config/utils')
const fs = require("node:fs");

module.exports = function () {
    const artists = utils.parseEntries(fs.readFileSync("src/entries/artists.csv", utils.handleError));
    const releases = utils.parseEntries(fs.readFileSync("src/entries/releases.csv", utils.handleError));
    const genres = utils.parseEntries(fs.readFileSync("src/entries/genres.csv", utils.handleError)).map(
        genre => genre.name
    );
    const missingGenres = [...new Set(artists.concat(releases).map(
        entry => entry.genres.split(',')).flat().filter(
            genre => !(genre === '' || genres.includes(genre))
        ))];
    return missingGenres;
};