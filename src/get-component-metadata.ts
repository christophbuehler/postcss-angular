import { tsquery } from "@phenomnomnominal/tsquery";
import {
  ArrayLiteralExpression,
  Identifier,
  NoSubstitutionTemplateLiteral,
  ObjectLiteralExpression,
  ScriptTarget,
  StringLiteral,
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
      .flatMap((property) =>{
        const initializer = property.initializer;

        if (initializer.kind === SyntaxKind.ArrayLiteralExpression) {
          return (initializer as ArrayLiteralExpression).elements.filter(
            (element): element is NoSubstitutionTemplateLiteral =>
              element.kind === SyntaxKind.NoSubstitutionTemplateLiteral &&
              (element as NoSubstitutionTemplateLiteral).text.trim().length > 0
          );
        }

        if (
          initializer.kind === SyntaxKind.NoSubstitutionTemplateLiteral ||
          initializer.kind === SyntaxKind.StringLiteral
        ) {
          const text = (initializer as StringLiteral | NoSubstitutionTemplateLiteral).text;
          return text.trim().length > 0 ? [initializer as NoSubstitutionTemplateLiteral] : [];
        }

        return [];
    }));
}
