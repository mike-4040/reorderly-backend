# Project Structure

```
functions/src/
├── index.ts              # Entry point - exports all HTTP functions
├── utils/                # Shared utilities
│   ├── config.ts         # Environment configuration (lazy-loaded)
│   ├── error-handler.ts  # Error handling and custom error classes
│   └── firestore.ts      # Firestore initialization and collection refs
├── oauth/                # OAuth providers
│   ├── shared/           # Shared OAuth utilities (state, tokens, audit)
│   └── square/           # Square-specific implementation
├── merchants/            # Merchant data management
│   ├── types.ts          # Merchant data models
│   ├── repository.ts     # Firestore CRUD operations
│   └── service.ts        # Business logic
└── docs/                 # Documentation
```

## Conventions

- **One concern per directory** - Each folder has a single responsibility
- **Types in separate files** - `types.ts` in each module
- **Provider-specific code** - Keep provider implementations isolated (e.g., `oauth/square/`)
- **Shared code in utils** - Generic utilities go in `utils/`

## Adding New Features

- **New OAuth provider**: Create `oauth/{provider}/` directory
- **New entity**: Create new top-level directory (e.g., `orders/`)
- **Shared utilities**: Add to `utils/`
- **HTTP functions**: Export from `index.ts`
