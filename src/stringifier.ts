import { stringify as postcssStringify, AnyNode } from "postcss";
import { logger } from "./logger";

export const stringify = (node: AnyNode, builder) => {
  logger.info(`Stringify called.`);

  try {
    node.root().nodes.forEach((node) => {
      builder(node.raws.angularCodeBefore, node);
      postcssStringify(node, builder);
      builder(node.raws.angularCodeAfter, node);
    });
  } catch (e) {
    logger.error(e);
  }
};
