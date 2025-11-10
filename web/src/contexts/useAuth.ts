/**
 * Hook to access authentication context
 */

import { useContext } from 'react';

import { AuthContext, AuthContextValue } from './auth-context';

/**
 * Hook to access auth context
 * Must be used within an AuthProvider
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
