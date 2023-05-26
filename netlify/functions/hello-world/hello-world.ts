import { Handler } from '@netlify/functions'
import { withPlanetscale } from '@netlify/planetscale';

export const handler: Handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection },
  } = context;

  const result = await connection.execute("select * from hello;");
  const message = result.rows[0]["name"];

  return {
    statusCode: 200,
    body: JSON.stringify({
      message
    }),
  };
});
