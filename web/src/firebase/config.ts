/**
 * Firebase configuration and initialization
 */

import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

import { getRequiredEnv } from '../utils/env';

/**
 * Firebase configuration from environment variables
 */
const firebaseConfig = {
  apiKey: getRequiredEnv('VITE_FIREBASE_API_KEY'),
  appId: getRequiredEnv('VITE_FIREBASE_APP_ID'),
  authDomain: getRequiredEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getRequiredEnv('VITE_FIREBASE_PROJECT_ID'),
};

/**
 * Initialize Firebase app
 */
export const app = initializeApp(firebaseConfig);

/**
 * Firebase Auth instance
 */
export const auth = getAuth(app);

/**
 * Connect to Firebase emulators in development
 */
if (import.meta.env.DEV) {
  // Connect to Auth emulator (custom port 3301)
  connectAuthEmulator(auth, 'http://127.0.0.1:3301', { disableWarnings: true });
}
