const eleventyNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const collections = require('./src/config/collections');
const filters = require('./src/config/filters');
const shortcodes = require('./src/config/shortcodes');
const transforms = require('./src/config/transforms');
const events = require('./src/config/events');
const globalData = require('./src/config/globalData');
const linters = require('./src/config/linters');
const inclusiveLanguage = require('@11ty/eleventy-plugin-inclusive-language');

module.exports = function(eleventyConfig) {
    eleventyConfig.setLiquidOptions({
      strictFilters: false
    });
    eleventyConfig.addPlugin(eleventyNavigation);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(collections);
    eleventyConfig.addPlugin(filters);
    eleventyConfig.addPlugin(shortcodes);
    eleventyConfig.addPlugin(transforms);
    eleventyConfig.addPlugin(events);
    eleventyConfig.addPlugin(globalData);
    eleventyConfig.addPlugin(linters);
    eleventyConfig.addPlugin(inclusiveLanguage);
    eleventyConfig.addPassthroughCopy("src/css/*.css");
    eleventyConfig.addPassthroughCopy({"src/public": "/"});
    eleventyConfig.addPassthroughCopy("src/images/**");
    eleventyConfig.setBrowserSyncConfig({
        files: './_site/css/**/*.css'
      });
    eleventyConfig.setQuietMode(true);
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