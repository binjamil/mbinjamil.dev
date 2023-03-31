import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    toc: z.array(
      z.object({
        parent: z.string(),
        children: z.array(z.string()).optional(),
      })
    ),
  }),
});

export const collections = { blog };
