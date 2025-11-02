# Linting and Formatting

This document describes the linting and formatting setup for the Firebase Functions codebase.

## Overview

We use two tools to maintain code quality and consistency:

- **ESLint** - Lints TypeScript code and enforces coding standards
- **Prettier** - Automatically formats code

## Scripts

```bash
# Fix all issues (lint + format)
npm run fix

# Lint with auto-fix
npm run lint

# Lint without auto-fix (for CI/CD)
npm run lint-ci

# Format all files
npm run format

# Check formatting without changes (for CI/CD)
npm run format-ci
```

## ESLint

ESLint is configured in `eslint.config.mjs` with strict TypeScript rules and import ordering.

### Import Ordering

Imports are automatically organized in this order:
1. Node.js built-in modules
2. npm packages
3. Internal modules
4. Relative imports (parent/sibling)

Imports within each group are alphabetically sorted with blank lines between groups.

## Prettier

Prettier is configured in `.prettierrc` with the following key settings:
- Single quotes
- Semicolons
- Trailing commas
- 100 character line width
- 2 space indentation

## VS Code Setup

Install these extensions for the best experience:
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)

Recommended settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## CI/CD Integration

Use the `-ci` scripts in your CI pipeline:

```bash
npm run lint-ci && npm run format-ci
```

These commands will fail if there are linting errors or formatting issues.

## Ignoring Files

To exclude files from linting or formatting:

**ESLint**: Add patterns to the `ignores` array in `eslint.config.mjs`:
```javascript
ignores: ['lib/**/*', 'eslint.config.mjs', 'package-lock.json']
```

**Prettier**: Add patterns to `.prettierignore`:
```
lib
node_modules
*.log
package-lock.json
```

## Best Practices

- Run `npm run fix` before committing to fix all linting and formatting issues
- Most issues can be auto-fixed
- Don't disable rules without documenting why
