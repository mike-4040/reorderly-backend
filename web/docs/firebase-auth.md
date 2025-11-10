# Firebase Authentication Setup

## Overview

Firebase email/password authentication is now implemented in the web app.

## Quick Start

### 1. Enable Email/Password Authentication in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`reorderly-staging`)
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** provider

### 2. Configure Environment Variables

We use Doppler for secrets management. Download secrets for your environment:

```bash
# Development
npm run secrets-dev

# Staging
npm run secrets-stg

# Production
npm run secrets-prd
```

This will create a `.env` file with your Firebase configuration.

**Required Doppler secrets** (in `web` project):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

Get these values from:
- Firebase Console → Project Settings → General → Your apps → Web app

### 3. Start Development Server

```bash
npm start
```

## Features Implemented

### Routes

- `/login` - Sign in with email/password
- `/signup` - Create new account
- All existing routes remain accessible

### UI Components

- **Header Navigation** - Shows sign in/sign up buttons for guests
- **User Menu** - Displays user email and sign out option when authenticated
- **Login Form** - Email/password with validation and error handling
- **Signup Form** - Account creation with password confirmation

### Auth Context

The auth system is split across three files for optimal React Fast Refresh:

- `src/contexts/auth-context.ts` - Context definition and types
- `src/contexts/AuthProvider.tsx` - Provider component
- `src/contexts/useAuth.ts` - Hook to access auth state

```typescript
import { useAuth } from '../contexts/useAuth';

const { user, loading, signIn, signUp, signOut } = useAuth();
```

- `user` - Current Firebase user or null
- `loading` - Auth state initialization status
- `signIn(email, password)` - Sign in existing user
- `signUp(email, password)` - Create new account
- `signOut()` - Sign out current user

## Usage Example

```typescript
import { useAuth } from '../contexts/useAuth';

function MyComponent() {
  const { user, signOut } = useAuth();

  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <p>Welcome {user.email}</p>
      <button onClick={() => void signOut()}>Sign Out</button>
    </div>
  );
}
```

## Security

- Firestore rules need to be updated to restrict access based on auth
- Consider adding email verification for production
- Password reset functionality can be added later

## Next Steps

1. **Update Firestore Rules** - Restrict merchant data access to authenticated users
2. **Link Auth with Merchants** - Associate Firebase UIDs with merchant records
3. **Add Protected Routes** - Redirect unauthenticated users from certain pages
4. **Email Verification** - Add email verification flow for new accounts
5. **Password Reset** - Implement forgot password functionality
