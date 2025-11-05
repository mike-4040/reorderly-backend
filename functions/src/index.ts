import { onRequest } from 'firebase-functions/https';

import { squareAuthorize } from './oauth/square/authorize';
import { squareCallback } from './oauth/square/callback';
import { config } from './utils/config';
import { handleError } from './utils/error-handler';

// OAuth endpoints
export { squareAuthorize, squareCallback };

export const helloWorld = onRequest((_request, response) => {
  try {
    console.log('Hello logs!');

    // Log config (excluding sensitive data)
    console.log('Configuration loaded:', {
      square: {
        environment: config.square.environment,
        redirectUri: config.square.redirectUri,
        hasClientId: !!config.square.clientId,
        hasClientSecret: !!config.square.clientSecret,
      },
      onboardingUrl: config.onboardingUrl,
      errorPageUrl: config.errorPageUrl,
    });

    response.send('Hello from Firebase!');
  } catch (error) {
    const errorResponse = handleError(error);
    response.status(500).json(errorResponse);
  }
});
