# ngrok Setup for Local OAuth Testing

## The Problem

Since Square needs to redirect back to your callback URL from their servers, they can't reach `http://localhost:5001` on your machine.

## The Solution

Use **ngrok** to create a public tunnel to your local emulator.

### How ngrok Works

ngrok creates a secure tunnel from a public URL to your local machine:

```
Internet → ngrok.io (public) → tunnel → your machine (localhost:5001)
```

When Square redirects to `https://your-subdomain.ngrok-free.dev/reorderly-staging/us-central1/squareCallback`, ngrok forwards that request to `http://localhost:5001/reorderly-staging/us-central1/squareCallback`

## Setup Steps

### 1. Install ngrok

```bash
# Using Homebrew (macOS)
brew install ngrok

# Or download from https://ngrok.com/download
```

### 2. Configure ngrok Auth Token

- Sign up at https://ngrok.com/signup
- Get your auth token from https://dashboard.ngrok.com/get-started/your-authtoken
- Add to your `~/.zshrc`:
  ```bash
  export NGROK_AUTHTOKEN=your_token_here
  ```
- Reload your shell: `source ~/.zshrc`

### 3. Start Firebase Emulator

```bash
npm start
```

The emulator runs on port `5001`

### 4. Start ngrok Tunnel

In a new terminal:

```bash
npm run tunnel
```

You'll see output like:

```
Forwarding   https://abdul-purehearted-undecidedly.ngrok-free.dev -> http://localhost:5001
```

### 5. Copy the ngrok URL

The ngrok public URL is available in two places:

- In the terminal output where you started ngrok
- In the ngrok web UI at `http://localhost:4040`

Copy the full HTTPS URL (e.g., `https://abdul-purehearted-undecidedly.ngrok-free.dev`)

### 6. Update Doppler Dev Config

Set `SQUARE_REDIRECT_URI` to:

```
https://your-subdomain.ngrok-free.dev/reorderly-staging/us-central1/squareCallback
```

### 7. Update Square Developer Dashboard

- Go to https://developer.squareup.com/apps
- Select your sandbox application
- Add redirect URL:
  ```
  https://your-subdomain.ngrok-free.dev/reorderly-staging/us-central1/squareCallback
  ```

### 8. Restart Your Emulator

Restart to pick up the new `SQUARE_REDIRECT_URI` from Doppler:

```bash
# Stop the emulator (Ctrl+C), then restart
npm start
```

You're now ready to test the OAuth flow! See [square-oauth.md](./square-oauth.md) for testing instructions.

## Alternative: Separate Square Applications

Instead of using ngrok, you can create separate Square applications:

- **Dev Square App:** Use for local testing (update redirect URL as needed)
- **Staging Square App:** Use for deployed staging (permanent URL)

Configure different credentials in Doppler for each environment:

- `dev` config → Dev Square app + ngrok URL (or localhost if testing without OAuth)
- `stg` config → Staging Square app + staging function URL
