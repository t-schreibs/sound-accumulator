const { parse } = require('csv-parse/sync');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/*.css");
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

    eleventyConfig.addShortcode("linkList", function(list, pages) {
      var pageNames = pages.map(page => page.data.title);
      return `<ul>
        `  + list.map(item => pageNames.includes(item) ? 
            `<li><a href="${pages.filter(page => page.data.title === item)[0].url}">${item}</a></li>` :
            `<li>${item}</li>`).join(`
            `) + `
          </ul>`
    });

    return {
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk",
        dir: {      
            input: "src",      
            includes: "_includes",      
            data: "_data",      
            output: "_site"    
        }
    };
};