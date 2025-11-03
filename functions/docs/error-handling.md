# Error Handling

## Error Classes

```typescript
// External errors - safe to show to users
throw new ExternalError('Invalid merchant ID');

// Silent external errors - expected errors, no logging needed
throw new ExternalSilentError('Session expired');

// Internal errors - generic "Internal Server Error" shown to users
throw new Error('database_connection_failed');
```

## Error Handler

```typescript
import { handleError } from './utils/error-handler';

try {
  // your code
} catch (error) {
  const response = handleError(error);
  res.status(500).json(response);
}
```

Returns: `{ success: false, message: string }`

## Error Naming Pattern

Use `functionName_problem` format:

```typescript
throw new Error('getRequiredEnv_missingEnvVariable', {
  cause: { key: 'API_KEY' },
});
```

## When to Use Each

- **ExternalError** - User input errors, validation failures (log + show message)
- **ExternalSilentError** - Expected flow errors like expired tokens (show message only)
- **Error** - Internal bugs, database errors (log + generic message)
- **Context in cause** - Add details via `{ cause: { ... } }`
