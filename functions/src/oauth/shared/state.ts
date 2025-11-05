/**
 * OAuth state management for CSRF protection
 */

import { randomBytes } from 'node:crypto';

import { Timestamp } from 'firebase-admin/firestore';

import { collections } from '../../utils/firestore';
import { OAuthState } from '../types';

const STATE_LENGTH = 32; // bytes
const STATE_TTL_MINUTES = 10;

/**
 * Generate a cryptographically secure random state string
 */
function generateStateString(): string {
  return randomBytes(STATE_LENGTH).toString('base64url');
}

/**
 * Create and store OAuth state for CSRF protection
 */
export async function createState(metadata?: Record<string, unknown>): Promise<string> {
  const state = generateStateString();
  const now = Timestamp.now();
  const expiresAt = Timestamp.fromMillis(now.toMillis() + STATE_TTL_MINUTES * 60 * 1000);

  const stateData: OAuthState = {
    state,
    createdAt: now,
    expiresAt,
    metadata,
  };

  await collections.oauthStates.doc(state).set(stateData);

  return state;
}

/**
 * Validate and consume OAuth state
 * Throws Error if invalid or expired
 */
export async function validateAndConsumeState(state: string): Promise<OAuthState> {
  if (!state) {
    throw new Error('validateState_missingState');
  }

  const doc = await collections.oauthStates.doc(state).get();

  if (!doc.exists) {
    throw new Error('validateState_notFound', { cause: { state } });
  }

  const stateData = doc.data() as OAuthState;

  // Consume the state (delete it so it can't be reused)
  await collections.oauthStates.doc(state).delete();

  // Check if expired
  if (Timestamp.now().toMillis() > stateData.expiresAt.toMillis()) {
    throw new Error('validateState_expired', { cause: { state } });
  }

  return stateData;
}

/**
 * Cleanup expired OAuth states (can be called periodically)
 */
export async function cleanupExpiredStates(): Promise<number> {
  const now = Timestamp.now();
  const expiredStates = await collections.oauthStates.where('expiresAt', '<', now).get();

  if (expiredStates.empty) {
    return 0;
  }

  const batch = collections.oauthStates.firestore.batch();
  expiredStates.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  return expiredStates.size;
}
