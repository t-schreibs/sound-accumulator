const utils = require('./utils');

module.exports = eleventyConfig => {
    eleventyConfig.addTransform("links", function(content) {
        const path = String(this.page.outputPath);
        if (!(path.endsWith(".html") || path.endsWith(".md"))) return content;
        return utils.replaceWikilinks(content);
      });
};