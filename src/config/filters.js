const slug = require('limax');

module.exports = eleventyConfig => {
    eleventyConfig.addFilter("slugify", (content) => slug(content));
    eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));
    eleventyConfig.addFilter("hasArtist", (arr, artist) => arr.filter(item => item.data.artists.includes(artist)));
    eleventyConfig.addFilter("hasGenre", (arr, genre) => arr.filter(item => item.data.genres.includes(genre)));
    eleventyConfig.addFilter("hasRelease", (arr, release) => arr.filter(item => item.data.release === release));
    eleventyConfig.addFilter("getInfo", (name, data) => data.filter(entry => entry.name === name)[0]);
    eleventyConfig.addFilter("randomPage", (collection, avoid) => collection.filter(
        entry => entry.data.title !== avoid)[Math.floor(Math.random() * collection.length)]);
};