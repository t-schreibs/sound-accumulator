const markdownIt = require("markdown-it");
const htmlToText = require('html-to-text');
const utils = require('./utils');

function textDescription(content) {
    md = new markdownIt();
    return htmlToText.convert(utils.replaceWikilinks(md.renderInline(content)));
}

module.exports = eleventyConfig => {
    eleventyConfig.addShortcode("linkList", function (list, pages) {
        var pageNames = pages.map(page => page.data.title);
        return `<ul>
          `  + list.map(item => pageNames.includes(item) ?
            `<li><a href="${pages.filter(page => page.data.title === item)[0].url}">${item}</a></li>` :
            `<li>${item}</li>`).join(`
              `) + `
            </ul>`
    });
    eleventyConfig.addShortcode("externalLinks", function(list) {
        return `<ul>
        ` + list.map(item => `<li><a href="${item}" target="_blank">${item}</a></li>`).join(`
        `) + `
        </ul>`
    });
    eleventyConfig.addShortcode("markdown", (content) => {
        md = new markdownIt();
        return md.render(content);
    });
    eleventyConfig.addShortcode("description", (page) => textDescription(page));
    eleventyConfig.addPairedShortcode("defaultIfEmpty", (content, optionalContent) => {
        if (optionalContent) {
            return optionalContent
        }
        return content;
    });
}