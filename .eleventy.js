const { parse } = require('csv-parse/sync');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/base.css");
    eleventyConfig.addDataExtension("csv", (contents) => {
        const records = parse(contents, {
          columns: true,
          skip_empty_lines: true,
        });
        return records;
      });
    eleventyConfig.setBrowserSyncConfig({
        files: './_site/css/**/*.css'
      });
    return {
        passthroughFileCopy: true,
        dir: {      
            input: "src",      
            includes: "_includes",      
            data: "_data",      
            output: "_site"    
        }
    };
};