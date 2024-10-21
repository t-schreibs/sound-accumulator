const utils = require('./utils');

module.exports = eleventyConfig => {
    eleventyConfig.addLinter(
        "correctly-formatted-links",
        function (content, inputPath, outputPath) {
            if (inputPath.endsWith(".html"))
            {
                const regex = /\[{1}(\[?[^\[\]]+\|[^\[\]]+\]?)\]{1}/gm;
                const matches = new Set(content.match(regex));
                if (matches) {
                    for (const match of matches) {
                        if (!match.startsWith('[[') || !match.endsWith(']]')) {
                            utils.handleError('Incorrectly formatted link detected in ' + outputPath + ': ' + match);
                        }
                    }
                }
            }
        }
    )
}