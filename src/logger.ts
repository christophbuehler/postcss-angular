import { format, createLogger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new DailyRotateFile({
      datePattern: "YYYY-MM-DD",
      filename: "%DATE%.log",
      dirname: ".postcss-angular",
      maxFiles: "14d",
      json: true,
    }),
  ],
});
