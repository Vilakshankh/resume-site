const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
].join(' ');

let accessToken = null;

export function spotifyConfigured() {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN,
  );
}

export function authConfigured() {
  return Boolean(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET);
}

export function scopes() {
  return SCOPES;
}

export function publicOrigin(req) {
  const hostHeader = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const host = String(Array.isArray(hostHeader) ? hostHeader[0] : hostHeader)
    .split(',')[0]
    .trim();
  const protoHeader = req.headers['x-forwarded-proto'];
  const proto = protoHeader
    ? String(Array.isArray(protoHeader) ? protoHeader[0] : protoHeader)
        .split(',')[0]
        .trim()
    : host.startsWith('localhost') || host.startsWith('127.0.0.1')
      ? 'http'
      : 'https';
  return `${proto}://${host}`;
}

export function requestUrl(req) {
  return new URL(req.url || '/', publicOrigin(req));
}

export function readCookie(req, name) {
  const raw = req.headers.cookie || '';
  const match = raw
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

export function send(res, status, body, headers = {}) {
  const json = typeof body !== 'string';
  res.writeHead(status, {
    'Content-Type': json ? 'application/json; charset=utf-8' : 'text/html; charset=utf-8',
    ...headers,
  });
  res.end(json ? JSON.stringify(body) : body);
}

function basicAuth() {
  return Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64');
}

async function requestToken(params) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error('Spotify token request failed', response.status, data.error || data);
    throw new Error('Spotify token request failed');
  }
  return data;
}

export async function exchangeCode(code, redirectUri) {
  return requestToken({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
  });
}

export async function getAccessToken() {
  if (accessToken && accessToken.expiresAt > Date.now()) return accessToken.value;

  const data = await requestToken({
    grant_type: 'refresh_token',
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
  });

  accessToken = {
    value: data.access_token,
    expiresAt: Date.now() + Math.max(30, (data.expires_in || 3600) - 60) * 1000,
  };
  return accessToken.value;
}

export function clearAccessToken() {
  accessToken = null;
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function coverOf(item) {
  const images = item.album?.images || item.images || item.show?.images || [];
  if (!images.length) return null;
  return [...images].sort((a, b) => (a.width || 9999) - (b.width || 9999))[0]?.url || null;
}

async function genreFor(item, token) {
  const artists = item.artists || item.album?.artists || [];
  for (const artist of artists) {
    if (!artist?.id) continue;
    const response = await fetch(`https://api.spotify.com/v1/artists/${artist.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) continue;
    const data = await response.json();
    if (data.genres?.length) return titleCase(data.genres[0]);
  }
  return null;
}

export async function describeItem(item, token) {
  const artists = item.artists?.map((artist) => artist.name).filter(Boolean) || [];
  const artist = artists.join(', ') || item.show?.name || item.album?.name || '';
  const genre = item.type === 'episode' ? 'Podcast' : await genreFor(item, token);

  return {
    title: item.name || '',
    artist,
    genre,
    cover: coverOf(item),
    url: item.external_urls?.spotify || null,
  };
}
