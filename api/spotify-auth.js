import { randomBytes } from 'node:crypto';
import {
  authConfigured,
  exchangeCode,
  publicOrigin,
  readCookie,
  requestUrl,
  scopes,
  send,
} from './spotify-lib.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export default async function handler(req, res) {
  if (!authConfigured()) {
    send(
      res,
      500,
      'Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET, then open this page again.',
      { 'Cache-Control': 'no-store' },
    );
    return;
  }

  const url = requestUrl(req);
  const redirectUri = `${publicOrigin(req)}/api/spotify-auth`;
  const error = url.searchParams.get('error');

  if (error) {
    send(res, 400, `Spotify authorization failed: ${escapeHtml(error)}`, {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    });
    return;
  }

  const code = url.searchParams.get('code');
  if (!code) {
    const state = randomBytes(16).toString('hex');
    const secure = redirectUri.startsWith('https://') ? '; Secure' : '';
    const authorize = new URL('https://accounts.spotify.com/authorize');
    authorize.searchParams.set('response_type', 'code');
    authorize.searchParams.set('client_id', process.env.SPOTIFY_CLIENT_ID);
    authorize.searchParams.set('scope', scopes());
    authorize.searchParams.set('redirect_uri', redirectUri);
    authorize.searchParams.set('state', state);
    res.writeHead(302, {
      Location: authorize.toString(),
      'Set-Cookie': `spotify_oauth_state=${state}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax${secure}`,
      'Cache-Control': 'no-store',
    });
    res.end();
    return;
  }

  const expected = readCookie(req, 'spotify_oauth_state');
  if (!expected || expected !== url.searchParams.get('state')) {
    send(res, 400, 'Spotify authorization state did not match. Start again from /api/spotify-auth.', {
      'Cache-Control': 'no-store',
    });
    return;
  }

  try {
    const token = await exchangeCode(code, redirectUri);
    const refresh = token.refresh_token;
    if (!refresh) {
      send(res, 500, 'Spotify did not return a refresh token. Remove app access in Spotify and try again.', {
        'Cache-Control': 'no-store',
      });
      return;
    }

    send(
      res,
      200,
      `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Spotify connected</title></head>
<body style="font-family: Helvetica, Arial, sans-serif; max-width: 40rem; margin: 3rem auto; padding: 0 1rem;">
  <h1>Spotify connected</h1>
  <p>Add this as the <code>SPOTIFY_REFRESH_TOKEN</code> environment variable, then redeploy. This page is the only place the token is shown.</p>
  <pre style="white-space: pre-wrap; word-break: break-all; background: #f4f4f4; padding: 1rem;">${escapeHtml(refresh)}</pre>
</body>
</html>`,
      { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
    );
  } catch (err) {
    console.error(err);
    send(res, 500, 'Could not exchange the Spotify authorization code.', { 'Cache-Control': 'no-store' });
  }
}
