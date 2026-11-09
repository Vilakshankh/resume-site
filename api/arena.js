export default async function handler(req, res) {
  const token = process.env.ARENA_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'ARENA_TOKEN not set' });
  }

  const { page = 1, per = 100 } = req.query;

  const upstream = await fetch(
    `https://api.are.na/v3/channels/design-portfolio-lsbfd38plvo/contents?page=${page}&per=${per}&sort=position_desc`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await upstream.json();

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.status(upstream.status).json(data);
}
