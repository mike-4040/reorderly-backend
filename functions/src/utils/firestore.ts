/**
 * Firestore initialization and common utilities
 */

import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
initializeApp();

// Get Firestore instance
export const db = getFirestore();

// Collection references
export const collections = {
  merchants: db.collection('merchants'),
  oauthStates: db.collection('oauth_states'),
  onboardingSessions: db.collection('onboarding_sessions'),
  auditLogs: db.collection('audit_logs'),
} as const;
