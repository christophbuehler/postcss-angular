import { format, createLogger, transports } from "winston";

const loggingEnabled = process.env.POSTCSS_ANGULAR_LOGGING === "true";

export const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: loggingEnabled
    ? [
        new transports.File({
          filename: ".postcss-angular/logs",
          maxsize: 5 * 1024 * 1024, // The maximum size of a log file in bytes (5 MB in this example)
        }),
      ]
    : [],
  silent: !loggingEnabled,
});
