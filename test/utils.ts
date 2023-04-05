"use strict";

import path from "path";
import fs from "fs";

export function* listupFixtures(rootDir: string) {
  for (const filename of fs.readdirSync(rootDir)) {
    const filepath = path.join(rootDir, filename);
    if (fs.statSync(filepath).isDirectory()) {
      for (const { filepath: childFilepath, content } of listupFixtures(
        filepath
      )) {
        yield {
          filename: childFilepath.slice(rootDir.length),
          filepath: childFilepath,
          content,
        };
      }
    } else {
      yield {
        filename,
        filepath,
        content: fs.readFileSync(filepath, "utf-8"),
      };
    }
  }
}
