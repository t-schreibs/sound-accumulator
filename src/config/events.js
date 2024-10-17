const fs = require("node:fs");
const { execSync } = require('child_process');
const utils = require('./utils');

module.exports = eleventyConfig => {
    eleventyConfig.on('eleventy.after', () => {
        execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' });
    });
}