import { defineCollection, z } from "astro:content";

// Blog post schema. Frontmatter is validated at build time —
// missing/wrong fields fail the build, which is a feature.
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(120),
    description: z.string().max(220),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("AppsDemo Team"),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),     // root-relative, e.g. "/blog/foo.png"
    heroAccent: z.string().optional(),    // tailwind gradient classes for fallback hero
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
