function compareAlphabetically(a, b) {
    return a.data.title.localeCompare(b.data.title);
  }

module.exports = eleventyConfig => {
    eleventyConfig.addCollection("alphabeticalArtist", function (collection) {
        return collection.getFilteredByTag('artist').sort(compareAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalGenre", function (collection) {
        return collection.getFilteredByTag('genre').sort(compareAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalRelease", function (collection) {
        return collection.getFilteredByTag('release').sort(compareAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalTrack", function (collection) {
        return collection.getFilteredByTag('track').sort(compareAlphabetically);
    });
};