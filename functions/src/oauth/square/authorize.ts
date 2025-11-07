/**
 * Square OAuth authorization endpoint
 * Initiates the OAuth flow by redirecting to Square
 */

import { onRequest } from 'firebase-functions/https';

import { handleError } from '../../utils/error-handler';
import { createState } from '../shared/state';

import { generateAuthorizationUrl } from './client';

/**
 * Initiate Square OAuth authorization flow
 * GET /squareAuthorize
 */
export const squareAuthorize = onRequest(async (_req, res) => {
  try {
    // Generate and store state for CSRF protection
    const state = await createState({
      timestamp: Date.now(),
    });

    // Generate authorization URL
    const authUrl = generateAuthorizationUrl(state);

    // Redirect to Square
    res.redirect(authUrl);
  } catch (error) {
    const errorResponse = handleError(error);
    res.status(500).json(errorResponse);
  }
});
