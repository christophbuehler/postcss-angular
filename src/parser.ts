import { ProcessOptions, Root, parse as postcssParse, Document } from "postcss";
import { getComponentStyles } from "./get-component-metadata";
import { logger } from "./logger";

export const parse = (source: string, opts: ProcessOptions): Root => {
  const sourceString = String(source);
  const { from } = opts;

  logger.info(`Parsing ${from}`);

  const document = postcssParse("", { from });

  try {
    const allStyles = getComponentStyles(sourceString, from);

    logger.info(`Located ${allStyles.length} inline styles.`);

    const nodes = allStyles
      .map((styles) => ({
        root: postcssParse(styles.text, opts),
        start: styles.getStart(),
        end: styles.getEnd(),
      }))
      .map(({ root, start, end }, idx, arr) => {
        const line = characterPosToLine(sourceString, start);
        logger.info(`Parsed styles. The first line is ${line}.`);
        root.walk((node) => {
          node.source.start.line += line;
          node.source.end.line += line;
        });

        const prevStyles = arr[idx - 1];
        const isLast = idx === arr.length - 1;

        // RootRaws.codeBefore and RootRaws.codeAfter are not yet used by Postcss,
        // so we have to do this ourselves.
        root.raws.angularCodeBefore = source.substring(
          prevStyles?.end - 1 ?? 0,
          start + 1
        );
        root.raws.angularCodeAfter = isLast
          ? source.substring(end - 1, source.length)
          : "";

        return root;
      });

    document.append(nodes);
  } catch (e) {
    logger.error(e);
  }

  return document.root();
};

function characterPosToLine(source: string, pos: number) {
  return source.substring(0, pos).match(/\n/g).length;
}
