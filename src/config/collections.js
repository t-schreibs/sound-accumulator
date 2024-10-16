require("core-js/actual/array/group-by");

function compareTitlesAlphabetically(a, b) {
    return a.data.title.localeCompare(b.data.title);
}
function compareOriginsAlphabetically(a, b) {
    return a.data.origin.localeCompare(b.data.origin);
}

module.exports = eleventyConfig => {
    eleventyConfig.addCollection("alphabeticalArtist", function (collection) {
        return collection.getFilteredByTag('artist').sort(compareTitlesAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalGenre", function (collection) {
        return collection.getFilteredByTag('genre').sort(compareTitlesAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalRelease", function (collection) {
        return collection.getFilteredByTag('release').sort(compareTitlesAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalTrack", function (collection) {
        return collection.getFilteredByTag('track').sort(compareTitlesAlphabetically);
    });
    eleventyConfig.addCollection("location", function (collection) {
        const grouped = collection.getFilteredByTag('artist').sort(compareOriginsAlphabetically)
            .groupBy(artist => artist.data.origin);
        return Object.keys(grouped).filter(key => key !== '').map(
            key => ({ "name": key, "artists": grouped[key].sort(compareTitlesAlphabetically) })
        );
    });
};