/**
 * Square OAuth callback endpoint
 * Handles the OAuth callback from Square
 */

import { onRequest } from 'firebase-functions/https';

import { upsertMerchant } from '../../merchants/repository';
import { config } from '../../utils/config';
import { ExternalError, handleError } from '../../utils/error-handler';
import { validateAndConsumeState } from '../shared/state';

import { exchangeCodeForTokens, fetchMerchantInfo } from './client';

/**
 * Handle Square OAuth callback
 * GET /squareCallback?code=...&state=...
 */
export const squareCallback = onRequest(async (req, res) => {
  try {
    // Extract parameters
    const { code, state, error: oauthError } = req.query;

    // Check for OAuth errors from Square
    if (oauthError) {
      handleError(
        new Error('squareCallback_oauthError', {
          cause: { error: oauthError },
        }),
      );

      const errorUrl = `${config.errorPageUrl}?error=oauth_failed`;
      res.redirect(errorUrl);
      return;
    }

    // Validate state
    if (!state || typeof state !== 'string') {
      throw new ExternalError('Missing or invalid state parameter');
    }

    await validateAndConsumeState(state);

    // Validate code
    if (!code || typeof code !== 'string') {
      throw new ExternalError('Missing authorization code');
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Fetch merchant information
    const merchantInfo = await fetchMerchantInfo(tokens.accessToken);

    // Save to Firestore
    const merchant = await upsertMerchant({
      provider: 'square',
      providerMerchantId: merchantInfo.id,
      tokens: {
        access: tokens.accessToken,
        refresh: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
        scopes: tokens.scopes,
      },
      locations: merchantInfo.locations,
      appVersion: req.get('user-agent'),
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });

    console.log('Merchant connected successfully:', {
      id: merchant.id,
      providerMerchantId: merchant.providerMerchantId,
      locationCount: merchant.locations.length,
    });

    // Redirect to success page
    const successUrl = `${config.onboardingUrl}/success?merchant_id=${merchant.id}`;
    res.redirect(successUrl);
  } catch (error) {
    handleError(error);

    // Extract error type from error message if available
    const errorType = error instanceof Error ? error.message : 'oauth_error';

    const errorUrl = `${config.errorPageUrl}?error=${errorType}`;
    res.redirect(errorUrl);
  }
});
