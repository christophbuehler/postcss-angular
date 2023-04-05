"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.parse = exports.isComponentFile = void 0;
const postcss_1 = require("postcss");
const get_component_metadata_1 = require("./get-component-metadata");
const logger_1 = require("./logger");
const isComponentFile = (filename) => filename.endsWith(".component.ts");
exports.isComponentFile = isComponentFile;
const parse = (source, opts) => {
    logger_1.logger.info(`Parse called.`, { source, opts });
    const sourceString = String(source);
    const { from } = opts;
    logger_1.logger.info(`Parsing ${from}`);
    const document = new postcss_1.Document();
    try {
        const allStyles = (0, get_component_metadata_1.getComponentStyles)(sourceString, from);
        logger_1.logger.info(`Located ${allStyles.length} inline styles.`);
        const nodes = allStyles
            .map((styles) => ({
            root: (0, postcss_1.parse)(styles.text, opts),
            start: styles.getStart(),
            end: styles.getEnd(),
        }))
            .map(({ root, start, end }, idx, arr) => {
            const line = characterPosToLine(sourceString, start);
            logger_1.logger.info(`Parsed styles. The first line is ${line}.`);
            root.walk((node) => {
                node.source.start.line += line;
                node.source.end.line += line;
            });
            const prevStyles = arr[idx - 1];
            const isLast = idx === arr.length - 1;
            // RootRaws.codeBefore and RootRaws.codeAfter are not yet used by Postcss,
            // so we have to do this ourselves.
            root.raws.angularCodeBefore = source.substring(prevStyles?.end - 1 ?? 0, start + 1);
            root.raws.angularCodeAfter = isLast
                ? source.substring(end - 1, source.length)
                : "";
            logger_1.logger.info({ before: root.raws.before, after: root.raws.after });
            return root;
        });
        document.append(nodes);
    }
    catch (e) {
        logger_1.logger.error(e);
    }
    return document.root();
};
exports.parse = parse;
const stringify = (node, builder) => {
    logger_1.logger.info(`Stringify called.`);
    try {
        node.root().nodes.forEach((node, idx) => {
            builder(node.raws.angularCodeBefore, node);
            (0, postcss_1.stringify)(node, builder);
            builder(node.raws.angularCodeAfter, node);
        });
    }
    catch (e) {
        logger_1.logger.error(e);
    }
};
exports.stringify = stringify;
function characterPosToLine(source, pos) {
    return source.substring(0, pos).match(/\n/g).length;
}
