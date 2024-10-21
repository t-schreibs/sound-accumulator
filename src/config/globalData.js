const utils = require('./utils');

module.exports = eleventyConfig => {
    eleventyConfig.addGlobalData('version', () => {
        const segment = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return `${segment()}-${segment()}-${segment()}`;
    });
    eleventyConfig.addDataExtension("csv", (contents) => utils.parseEntries(contents));
}