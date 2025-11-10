/**
 * Environment variable utilities
 */

/**
 * Get required environment variable
 * Throws error if the variable is missing
 */
export function getRequiredEnv(key: string): string {
  const value = import.meta.env[key] as string | undefined;
  if (!value) {
    throw new Error("getRequiredEnv_missingEnvVariable", {
      cause: { key },
    });
  }
  return value;
}
