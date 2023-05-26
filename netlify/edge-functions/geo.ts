import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  return Response.json({
    geo: context.geo,
    ip: context.ip,
  });
};

export const config = { path: "/edge/geo" };
