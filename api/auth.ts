import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  isAuthenticated,
  isValidAdminPassword,
  getAdminPassword,
  createSessionToken,
  getLoginCookieHeader,
  getLogoutCookieHeader,
} from './_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS and security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const action = req.query.action || (req.body && req.body.action);

  // 1. Session Check (GET /api/auth or GET /api/auth?action=session)
  if (req.method === 'GET' || action === 'session') {
    const authed = isAuthenticated(req);
    return res.status(200).json({
      authenticated: authed,
    });
  }

  // 2. Login (POST /api/auth or POST /api/auth?action=login)
  if (req.method === 'POST') {
    if (action === 'logout') {
      res.setHeader('Set-Cookie', getLogoutCookieHeader());
      return res.status(200).json({
        success: true,
        authenticated: false,
        message: 'Logged out successfully',
      });
    }

    // Handle Login
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const password = body?.password;

    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Password is required',
      });
    }

    if (!isValidAdminPassword(password)) {
      // Artificial delay to prevent brute-forcing
      await new Promise((resolve) => setTimeout(resolve, 600));
      return res.status(401).json({
        success: false,
        error: 'Incorrect admin password. Please check your credentials.',
      });
    }

    // Create session token and set secure HttpOnly cookie
    const sessionToken = createSessionToken();
    res.setHeader('Set-Cookie', getLoginCookieHeader(sessionToken));

    return res.status(200).json({
      success: true,
      authenticated: true,
      message: 'Admin authentication successful',
    });
  }

  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
