const { parse } = require('csv-parse/sync');
const eleventyNavigation = require('@11ty/eleventy-navigation');
const markdownIt = require("markdown-it");
const { execSync } = require('child_process');

function compareAlphabetically(a, b) {
  if (a.data.title < b.data.title) {
    return -1;
  }
  if (a.data.title > b.data.title) {
    return 1;
  }
  return 0;
}

module.exports = function(eleventyConfig) {
    eleventyConfig.setLiquidOptions({
      strictFilters: false
    });
    eleventyConfig.addPlugin(eleventyNavigation);
    eleventyConfig.addPassthroughCopy("src/css/*.css");
    eleventyConfig.addDataExtension("csv", (contents) => {
        const records = parse(contents, {
          columns: true,
          skip_empty_lines: true
        });
        return records;
      });
    eleventyConfig.setBrowserSyncConfig({
        files: './_site/css/**/*.css'
      });
    eleventyConfig.addCollection("alphabeticalArtist", function(collection) {
      return collection.getFilteredByTag('artist').sort(compareAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalGenre", function(collection) {
      return collection.getFilteredByTag('genre').sort(compareAlphabetically);
    });
    eleventyConfig.addCollection("alphabeticalRelease", function(collection) {
      return collection.getFilteredByTag('release').sort(compareAlphabetically);
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
            `<li><a href="${pages.filter(page => page.data.title === item)[0].url}">${item.replace("&#39;", "'")}</a></li>` :
            `<li>${item}</li>`).join(`
            `) + `
          </ul>`
    });
    eleventyConfig.addShortcode("markdown", (content) => {
      md = new markdownIt();
      return md.render(content);
    });
    eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));
    eleventyConfig.addFilter("hasArtist", (arr, artist) => arr.filter(item => item.data.artists.includes(artist)));
    eleventyConfig.addFilter("hasGenre", (arr, genre) =>arr.filter(item => item.data.genres.includes(genre)));
    eleventyConfig.addFilter("hasRelease", (arr, release) =>arr.filter(item => item.data.releases.includes(release)));
    eleventyConfig.on('eleventy.after', () => {
      execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
    })

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