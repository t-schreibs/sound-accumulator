const { parse } = require('csv-parse/sync');
const slug = require('limax');

function parseEntries(contents) {
  return parse(contents, {
    columns: true,
    skip_empty_lines: true
  });
}
function handleError(err) {
  if (err) {
    console.log("\x1b[31m%s\x1b[0m", err);
    process.exit(1);
  }
}
function slugifyLastSegment(url) {
  return url.replace(/\/(.*)$/, function (a) { return `/` + slug(a) });
}
function replaceWikilinks(content) {
  return content.replace(/\[\[(.*?)\|(.*?)\]\]/gm, (_match, a, b) => `<a href="/` + slugifyLastSegment(a) + `">` + b + `</a>`)
    .replace(/\[\[(.*?)\]\]/gm, (_match, a) => `<a href="/` + slugifyLastSegment(a) + `">` + a + `</a>`);
}

exports.parseEntries = parseEntries;
exports.handleError = handleError;
exports.replaceWikilinks = replaceWikilinks;