import {
  clearAccessToken,
  describeItem,
  getAccessToken,
  send,
  spotifyConfigured,
} from './spotify-lib.js';

async function spotifyGet(path, token) {
  const response = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) {
    clearAccessToken();
    const error = new Error('Spotify unauthorized');
    error.status = 401;
    throw error;
  }
  return response;
}

async function currentItem(token) {
  const playing = await spotifyGet(
    '/me/player/currently-playing?additional_types=track,episode',
    token,
  );

  if (playing.status === 200) {
    const data = await playing.json();
    if (data.item) return { item: data.item, playing: Boolean(data.is_playing) };
  } else if (playing.status !== 204) {
    console.error('Spotify currently-playing failed', playing.status);
  }

  const recent = await spotifyGet('/me/player/recently-played?limit=1', token);
  if (!recent.ok) {
    console.error('Spotify recently-played failed', recent.status);
    return null;
  }

  const data = await recent.json();
  const item = data.items?.[0]?.track;
  return item ? { item, playing: false } : null;
}

export default async function handler(_req, res) {
  if (!spotifyConfigured()) {
    send(res, 200, { playing: false }, { 'Cache-Control': 'no-store' });
    return;
  }

  try {
    let token = await getAccessToken();
    let current;
    try {
      current = await currentItem(token);
    } catch (error) {
      if (error?.status !== 401) throw error;
      token = await getAccessToken();
      current = await currentItem(token);
    }

    if (!current?.item?.name) {
      send(res, 200, { playing: false }, { 'Cache-Control': 's-maxage=15, stale-while-revalidate=30' });
      return;
    }

    const track = await describeItem(current.item, token);
    send(
      res,
      200,
      { playing: current.playing, ...track },
      { 'Cache-Control': 's-maxage=15, stale-while-revalidate=30' },
    );
  } catch (error) {
    console.error(error);
    send(res, 200, { playing: false }, { 'Cache-Control': 'no-store' });
  }
}
