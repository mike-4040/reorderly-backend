/**
 * Common OAuth types and interfaces
 */

import { Timestamp } from 'firebase-admin/firestore';

/**
 * OAuth token response from provider
 */
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: Timestamp;
  scopes: string[];
}

/**
 * OAuth state stored for CSRF protection
 */
export interface OAuthState {
  state: string;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  metadata?: Record<string, unknown>;
}
