const utils = require('../../src/scripts/utils')
const fs = require("node:fs");

module.exports = function () {
	const files = fs.readdirSync("src/entries/tracklists", utils.handleError);
    const tracks = files.map(
        file => {
            const csv = utils.parseEntries(fs.readFileSync("src/entries/tracklists/" + file, utils.handleError));
            const release = file.substring(0, file.length - 4);
            csv.map(
                track => {
                    track.release = release;
                    return track;
                }
            )
            return csv;
        });
    return tracks.flat();
};