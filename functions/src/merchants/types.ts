/**
 * Merchant data types and interfaces
 */

import { Timestamp } from 'firebase-admin/firestore';

/**
 * Supported OAuth providers
 */
export type Provider = 'square';

/**
 * Location information from provider
 */
export interface Location {
  id: string;
  name: string;
  address?: string;
  timezone?: string;
  capabilities?: string[];
}

/**
 * OAuth token data
 */
export interface TokenData {
  access: string;
  refresh: string;
  expiresAt: Timestamp;
  scopes: string[];
}

/**
 * Audit entry for tracking changes
 */
export interface AuditEntry {
  timestamp: Timestamp;
  event: string;
  appVersion?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Merchant metadata
 */
export interface MerchantMetadata {
  connectedAt: Timestamp;
  lastRefreshedAt?: Timestamp;
  appVersion?: string;
  revoked: boolean;
  scopesMismatch?: boolean;
}

/**
 * Complete merchant record
 */
export interface Merchant {
  id: string; // Our internal ID (Firestore doc ID)
  provider: Provider;
  providerId: string; // merchant_id from provider
  tokens: TokenData;
  locations: Location[];
  metadata: MerchantMetadata;
}

/**
 * Data required to create/update a merchant
 */
export interface MerchantInput {
  provider: Provider;
  providerId: string;
  tokens: TokenData;
  locations: Location[];
  appVersion?: string;
  ip?: string;
  userAgent?: string;
}
