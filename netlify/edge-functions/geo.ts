import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  return Response.json({
    geo: context.geo,
    ip: context.ip,
  });
};

export const config = { path: "/edge/geo" };
