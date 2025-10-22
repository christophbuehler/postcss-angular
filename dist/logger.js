"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const loggingEnabled = process.env.POSTCSS_ANGULAR_LOGGING === "true";
exports.logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    transports: loggingEnabled
        ? [
            new winston_1.transports.File({
                filename: ".postcss-angular/logs",
                maxsize: 5 * 1024 * 1024, // The maximum size of a log file in bytes (5 MB in this example)
            }),
        ]
        : [],
    silent: !loggingEnabled,
});
