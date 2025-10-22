"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentStyles = void 0;
const tsquery_1 = require("@phenomnomnominal/tsquery");
const typescript_1 = require("typescript");
function getComponentStyles(content, path) {
    const sourceFile = (0, typescript_1.createSourceFile)(path, content, typescript_1.ScriptTarget.ES2015, true);
    const componentDecoratorNodes = (0, tsquery_1.tsquery)(sourceFile, 'Decorator:has(Identifier[name="Component"])');
    const objectLiteralExpressions = componentDecoratorNodes.map((node) => (0, tsquery_1.tsquery)(node, "ObjectLiteralExpression")[0]);
    return objectLiteralExpressions.flatMap(({ properties }) => properties
        .filter(typescript_1.isPropertyAssignment)
        .filter((property) => property.name.text === "styles")
        .flatMap((property) => {
        const initializer = property.initializer;
        if (initializer.kind === typescript_1.SyntaxKind.ArrayLiteralExpression) {
            return initializer.elements.filter((element) => element.kind === typescript_1.SyntaxKind.NoSubstitutionTemplateLiteral &&
                element.text.trim().length > 0);
        }
        if (initializer.kind === typescript_1.SyntaxKind.NoSubstitutionTemplateLiteral ||
            initializer.kind === typescript_1.SyntaxKind.StringLiteral) {
            const text = initializer.text;
            return text.trim().length > 0 ? [initializer] : [];
        }
        return [];
    }));
}
exports.getComponentStyles = getComponentStyles;
