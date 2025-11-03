/**
 * Common OAuth types and interfaces
 */

import { Timestamp } from 'firebase-admin/firestore';

import type { Location } from '../merchants/types';

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

/**
 * Merchant information from provider
 */
export interface MerchantInfo {
  id: string; // Provider's merchant ID
  name?: string;
  email?: string;
  locations: Location[];
}

/**
 * OAuth error codes
 */
export enum OAuthErrorCode {
  INVALID_STATE = 'invalid_state',
  MISSING_CODE = 'missing_code',
  TOKEN_EXCHANGE_FAILED = 'token_exchange_failed',
  PROVIDER_API_ERROR = 'provider_api_error',
  INVALID_RESPONSE = 'invalid_response',
}

/**
 * OAuth error
 */
export class OAuthError extends Error {
  constructor(
    public code: OAuthErrorCode,
    message: string,
    public correlationId?: string,
  ) {
    super(message);
    this.name = 'OAuthError';
  }
}

/**
 * State validation error
 */
export class StateValidationError extends OAuthError {
  constructor(message: string, correlationId?: string) {
    super(OAuthErrorCode.INVALID_STATE, message, correlationId);
    this.name = 'StateValidationError';
  }
}
