const fs = require("node:fs");
const markdownIt = require("markdown-it");
const { execSync } = require('child_process');
const utils = require('./src/scripts/utils');
const eleventyNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
    eleventyConfig.setLiquidOptions({
      strictFilters: false
    });
    eleventyConfig.addPlugin(eleventyNavigation);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPassthroughCopy("src/css/*.css");
    eleventyConfig.addPassthroughCopy("src/images/**");
    eleventyConfig.addDataExtension("csv", (contents) => utils.parseEntries(contents));
    eleventyConfig.setBrowserSyncConfig({
        files: './_site/css/**/*.css'
      });
    eleventyConfig.addCollection("alphabeticalArtist", function(collection) {
      return collection.getFilteredByTag('artist').sort(utils.compareAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalGenre", function(collection) {
      return collection.getFilteredByTag('genre').sort(utils.compareAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalRelease", function(collection) {
      return collection.getFilteredByTag('release').sort(utils.compareAlphabetically);
    });
    eleventyConfig.addTransform("links", function(content) {
      const path = String(this.page.outputPath);
      if (!(path.endsWith(".html") || path.endsWith(".md"))) return content;
      return content.replace(/\[\[(.*?)\|(.*?)\]\]/gm, `<a href="/$1">$2</a>`)
                    .replace(/\[\[(.*?)\]\]/gm, `<a href="/$1">$1</a>`);
    });
    eleventyConfig.addShortcode("linkList", function(list, pages) {
      var pageNames = pages.map(page => page.data.title);
      return `<ul>
        `  + list.map(item => pageNames.includes(item) ? 
            `<li><a href="${pages.filter(page => page.data.title === item)[0].url}">${item}</a></li>` :
            `<li>${item}</li>`).join(`
            `) + `
          </ul>`
    });
    eleventyConfig.addShortcode("markdown", (content) => {
      md = new markdownIt();
      return md.render(content);
    });
    eleventyConfig.addPairedShortcode("defaultIfEmpty", (content, optionalContent) => {
      if (optionalContent)
      {
        return optionalContent
      }
      return content;
    })
    eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));
    eleventyConfig.addFilter("hasArtist", (arr, artist) => arr.filter(item => item.data.artists.includes(artist)));
    eleventyConfig.addFilter("hasGenre", (arr, genre) => arr.filter(item => item.data.genres.includes(genre)));
    eleventyConfig.addFilter("hasRelease", (arr, release) => arr.filter(item => item.data.release === release));
    eleventyConfig.on('eleventy.before', () => {
      const records = fs.readFileSync("src/entries/releases.csv", utils.handleError);
      for (const release of utils.parseEntries(records))
      {
        utils.generateTracksFileIfNonexistent(release.name)
      }
    });
    eleventyConfig.on('eleventy.after', () => {
      execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' });
    });

    return {
        passthroughFileCopy: true,
        dir: {      
            input: "src",      
            includes: "_includes",      
            data: "entries",      
            output: "_site"    
        }
    };
};