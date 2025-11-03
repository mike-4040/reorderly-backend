# Configuration

## Environment Variables

Create `.env` from `.env.example`:

```bash
# Square OAuth
SQUARE_CLIENT_ID=
SQUARE_CLIENT_SECRET=
SQUARE_REDIRECT_URI=
SQUARE_ENVIRONMENT=sandbox  # or production

# Application
ONBOARDING_URL=
ERROR_PAGE_URL=  # optional, defaults to /error
```

## Usage

```typescript
import { config } from './utils/config';

// Access configuration
const clientId = config.square.clientId;
const onboardingUrl = config.onboardingUrl;
```

## How It Works

- **Lazy loading** - Values validated only when accessed
- **Test-friendly** - Set `process.env` in tests before accessing config
- **Required by default** - Throws error if env var missing
- **Optional values** - Use `??` operator (e.g., `ERROR_PAGE_URL`)

## Adding New Config

```typescript
export const config = {
  get newProvider(): NewProviderConfig {
    return {
      apiKey: getRequiredEnv('NEW_PROVIDER_API_KEY'),
      // ...
    };
  },
};
```

Add to `.env.example` and update this doc.
