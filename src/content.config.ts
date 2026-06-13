import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    dateCreated: z.date(),
    tagLine: z.string(),
    thumbnailImage: z.string().optional(),
    headerImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    public: z.boolean().default(true),
  }),
});

export const collections = { projects };
