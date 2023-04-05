"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractStyles = void 0;
const path = require("path");
const fs = require("fs");
function extractStyles(metadata) {
    if (metadata.styles) {
        return metadata.styles;
    }
    else if (metadata.styleUrls) {
        return metadata.styleUrls.map((styleUrl) => {
            const filePath = path.join(__dirname, styleUrl);
            return fs.readFileSync(filePath, "utf8");
        });
    }
    return [];
}
exports.extractStyles = extractStyles;
