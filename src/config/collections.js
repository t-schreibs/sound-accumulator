require("core-js/actual/array/group-by");
const { removeMissing } = require('./utils');

function compareTitlesAlphabetically(a, b) {
    return a.data.title.localeCompare(b.data.title);
}
function compareOriginsAlphabetically(a, b) {
    return a.data.origin.localeCompare(b.data.origin);
}
module.exports = eleventyConfig => {
    eleventyConfig.addCollection("alphabeticalArtist", 
        (collection) => removeMissing(collection.getFilteredByTag('artist')).sort(compareTitlesAlphabetically));
    eleventyConfig.addCollection("alphabeticalGenre", 
        (collection) => removeMissing(collection.getFilteredByTag('genre')).sort(compareTitlesAlphabetically));
    eleventyConfig.addCollection("alphabeticalRelease", 
        (collection) => collection.getFilteredByTag('release').sort(compareTitlesAlphabetically));
    eleventyConfig.addCollection("alphabeticalTrack", 
        (collection) => collection.getFilteredByTag('track').sort(compareTitlesAlphabetically));
    eleventyConfig.addCollection("location", (collection) => {
            const grouped = removeMissing(collection.getFilteredByTag('artist')).sort(compareOriginsAlphabetically)
                .groupBy(artist => artist.data.origin);
            return Object.keys(grouped).filter(key => key !== '').map(
                key => ({ "name": key, "artists": grouped[key].sort(compareTitlesAlphabetically) })
            );
        });
};