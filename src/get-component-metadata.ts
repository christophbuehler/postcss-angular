import { tsquery } from "@phenomnomnominal/tsquery";
import {
  ArrayLiteralExpression,
  Identifier,
  NoSubstitutionTemplateLiteral,
  ObjectLiteralExpression,
  ScriptTarget,
  SyntaxKind,
  createSourceFile,
  isPropertyAssignment,
} from "typescript";

export function getComponentStyles(
  content: string,
  path: string
): NoSubstitutionTemplateLiteral[] {
  const sourceFile = createSourceFile(path, content, ScriptTarget.ES2015, true);
  const componentDecoratorNodes = tsquery(
    sourceFile,
    'Decorator:has(Identifier[name="Component"])'
  );

  const objectLiteralExpressions = componentDecoratorNodes.map(
    (node) =>
      tsquery(node, "ObjectLiteralExpression")[0] as ObjectLiteralExpression
  );

  return objectLiteralExpressions.flatMap(({ properties }) =>
    properties
      .filter(isPropertyAssignment)
      .filter((property) => (property.name as Identifier).text === "styles")
      .flatMap(
        (property) =>
          (property.initializer as ArrayLiteralExpression).elements.filter(
            (element) =>
              element.kind === SyntaxKind.NoSubstitutionTemplateLiteral
          ) as NoSubstitutionTemplateLiteral[]
      )
  );
}
