function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required key: ${key}`);
  }
  return value;
}

function requireEnvNumber(key: string): number {
  const value = requireEnv(key);
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Env var ${key} must be a number, got "${value}"`);
  }
  return parsed;
}

export const PORT = requireEnvNumber("PORT");
export const CLIENT_URL = requireEnv("CLIENT_URL");
export const DATABASE_FILE_NAME = requireEnv("DATABASE_FILE_NAME");
export const NODE_ENV = requireEnv("NODE_ENV");
