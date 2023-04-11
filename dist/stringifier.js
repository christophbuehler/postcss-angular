"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = void 0;
const postcss_1 = require("postcss");
const logger_1 = require("./logger");
const stringify = (node, builder) => {
    logger_1.logger.info(`Stringify called.`);
    try {
        node.root().nodes.forEach((node) => {
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
