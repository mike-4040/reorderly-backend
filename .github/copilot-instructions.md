# Copilot Instructions

## Script Naming Conventions

When creating scripts that perform similar tasks with different behavior for CI/CD, use the `-ci` suffix for the CI-friendly variant.

- Base scripts should auto-fix/modify by default (for development)
- CI scripts should check-only without modifications (use `-ci` suffix)

Example:
- `lint` → runs with `--fix`
- `lint-ci` → runs without `--fix` (fails on errors)
- `format` → runs with `--write`
- `format-ci` → runs with `--check` (fails if formatting needed)

## Documentation Best Practices

When creating or updating technical documentation:

- **Be concise and practical** - Focus on "how to use" rather than "how it works"
- **Remove unnecessary details** - Implementation details belong in config files, not docs
- **Prioritize common use cases** - Document what developers need day-to-day
- **Keep it actionable** - Include examples and commands developers can copy-paste
- **Avoid redundancy** - Don't repeat information that's already in config files or official docs
- **Update as you go** - When adding features, update docs to reflect the simplest way to use them

Good documentation answers: "What do I need to know to use this effectively?"
Bad documentation explains: "Here's every configuration option and its internal workings"
