/**
 * Application configuration management
 * Loads and validates environment variables
 */

import { env } from 'node:process';

interface SquareConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  environment: 'sandbox' | 'production';
}

/**
 * Get required environment variable
 */
function getRequiredEnv(key: string): string {
  const value = env[key];
  if (!value) {
    throw new Error('getRequiredEnv_missingEnvVariable', { cause: { key } });
  }
  return value;
}

/**
 * Application configuration with lazy loading
 * Values are validated only when accessed, making it easier to mock in tests
 */
export const config = {
  get square(): SquareConfig {
    return {
      clientId: getRequiredEnv('SQUARE_CLIENT_ID'),
      clientSecret: getRequiredEnv('SQUARE_CLIENT_SECRET'),
      redirectUri: getRequiredEnv('SQUARE_REDIRECT_URI'),
      environment: env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox',
    };
  },

  get onboardingUrl(): string {
    return getRequiredEnv('ONBOARDING_URL');
  },

  get errorPageUrl(): string {
    return env.ERROR_PAGE_URL ?? '/error';
  },
};
