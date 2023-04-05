"use strict";

import path from "path";
import chai from "chai";
import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";
import stylelint from "stylelint";
import stylelintConfig from "stylelint-config-standard";
import { listupFixtures } from "./utils";
const customSyntax = require.resolve("../dist");

chai.use(jestSnapshotPlugin());

const FIXTURE_ROOT = path.resolve(__dirname, "../test-fixtures");

describe("Integration with stylelint", () => {
  for (const { filename, content } of listupFixtures(FIXTURE_ROOT)) {
    describe(`stylelint with typescript`, () => {
      console.log({ filename, content });
      it(filename, () =>
        stylelint
          .lint({
            code: content,
            codeFilename: filename,
            config: {
              ...stylelintConfig,
              overrides: [
                {
                  files: ["*.component.ts", "**/*.component.ts"],
                  customSyntax,
                },
              ],
            },
          })
          .then((result) => {
            const actual = result.results[0].warnings;
            chai.expect(actual).toMatchSnapshot();
          })
      );
    });
    describe(`stylelint --fix with angular component`, () => {
      it(filename, () =>
        stylelint
          .lint({
            code: content,
            codeFilename: filename,
            customSyntax,
            config: stylelintConfig,
            fix: true,
          })
          .then((result) => {
            const actual = result.output;
            chai.expect(actual).toMatchSnapshot();
          })
      );
    });
  }
});
