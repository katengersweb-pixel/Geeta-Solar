import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'geeta_admin_session';
const SESSION_DURATION_SECONDS = 86400 * 7; // 7 days

function getSecretKey(): string {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || 'geeta-solars-secure-session-key-2026';
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD_1 || process.env.ADMIN_PASSWORD || 'Geeta@Admin2026';
}

export function getValidAdminPasswords(): string[] {
  const admin1 = process.env.ADMIN_PASSWORD_1 || process.env.ADMIN_PASSWORD || 'Geeta@Admin2026';
  const admin2 = process.env.ADMIN_PASSWORD_2 || 'Geeta@AdminTwo2026';
  return [admin1, admin2];
}

export function isValidAdminPassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;
  return getValidAdminPasswords().includes(password);
}

export interface SessionPayload {
  role: 'admin';
  createdAt: number;
  expiresAt: number;
}

/**
 * Creates a cryptographically signed session token
 */
export function createSessionToken(): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    role: 'admin',
    createdAt: now,
    expiresAt: now + SESSION_DURATION_SECONDS,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecretKey())
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies and decodes a session token
 */
export function verifySessionToken(token?: string | null): boolean {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadB64, signature] = parts;

  const expectedSignature = crypto
    .createHmac('sha256', getSecretKey())
    .update(payloadB64)
    .digest('base64url');

  // Constant-time comparison to prevent timing attacks
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }

  try {
    const payload: SessionPayload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8')
    );

    const now = Math.floor(Date.now() / 1000);
    if (!payload.expiresAt || payload.expiresAt < now) {
      return false;
    }

    return payload.role === 'admin';
  } catch {
    return false;
  }
}

/**
 * Parses cookies from raw cookie header
 */
export function parseCookies(cookieHeader?: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  const pairs = cookieHeader.split(';');
  for (const pair of pairs) {
    const idx = pair.indexOf('=');
    if (idx < 0) continue;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    cookies[key] = decodeURIComponent(val);
  }

  return cookies;
}

/**
 * Extracts session from incoming request
 */
export function isAuthenticated(req: { headers: Record<string, string | string[] | undefined> }): boolean {
  const cookieHeader = req.headers['cookie'] || req.headers['Cookie'];
  const cookies = parseCookies(Array.isArray(cookieHeader) ? cookieHeader[0] : cookieHeader);
  const token = cookies[SESSION_COOKIE_NAME];
  return verifySessionToken(token);
}

/**
 * Generates Set-Cookie header for session login
 */
export function getLoginCookieHeader(token: string, isProduction: boolean = process.env.NODE_ENV === 'production'): string {
  const secureFlag = isProduction ? '; Secure' : '';
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_DURATION_SECONDS}; HttpOnly; SameSite=Lax${secureFlag}`;
}

/**
 * Generates Set-Cookie header for session logout
 */
export function getLogoutCookieHeader(isProduction: boolean = process.env.NODE_ENV === 'production'): string {
  const secureFlag = isProduction ? '; Secure' : '';
  return `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secureFlag}`;
}
