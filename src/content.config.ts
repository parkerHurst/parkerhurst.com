import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({
		base: './src/content/blog',
		pattern: '**/*.{md,markdown}',
		generateId: ({ entry }) =>
			entry.replace(/\.(?:md|markdown)$/, '').replace(/\/index$/, ''),
	}),
	schema: ({ image }) =>
		z
			.object({
				title: z.string().min(1),
				description: z.string().min(1),
				publishedAt: z.coerce.date(),
				updatedAt: z.coerce.date().optional(),
				draft: z.boolean().default(false),
				cover: image().optional(),
				coverAlt: z.string().min(1).optional(),
			})
			.refine((data) => !data.cover || data.coverAlt, {
				message: 'coverAlt is required when cover is set',
				path: ['coverAlt'],
			}),
});

export const collections = { blog };
