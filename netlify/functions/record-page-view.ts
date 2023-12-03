import type { Handler } from '@netlify/functions'
import { withPlanetscale } from '@netlify/planetscale';

export const handler: Handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection },
  } = context;

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid http method'
      })
    }
  }

  const { geo, ip, slug } = JSON.parse(event.body || "{}");

  try {
    await connection.execute(
      "INSERT INTO page_views (slug, city, subdivision, country, timezone, client_ip) VALUES (?, ?, ?, ?, ?, ?)",
      [
        slug,
        geo.city,
        geo.subdivision.name,
        geo.country.name,
        geo.timezone,
        ip,
      ]
    );
  }
  catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "OK"
    }),
  };
});
