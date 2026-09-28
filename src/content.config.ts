import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writings = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/writings",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    toc: z.array(
      z.object({
        parent: z.string(),
        children: z.array(z.string()).optional(),
      }),
    ),
  }),
});

export const collections = { writings };
