"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.parse = void 0;
var parser_1 = require("./parser");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parser_1.parse; } });
var stringifier_1 = require("./stringifier");
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return stringifier_1.stringify; } });
