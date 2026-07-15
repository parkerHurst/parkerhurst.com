// @ts-check
import { defineConfig } from 'astro/config';

function rehypeImageCaptions() {
	return (tree) => {
		const transform = (node) => {
			if (!Array.isArray(node.children)) return;

			node.children = node.children.map((child) => {
				if (child.type === 'element' && child.tagName === 'p' && child.children.length === 1) {
					const image = child.children[0];
					const alt = image.properties?.alt;

					if (image.type === 'element' && image.tagName === 'img' && typeof alt === 'string' && alt.trim()) {
						return {
							type: 'element',
							tagName: 'figure',
							properties: {},
							children: [
								image,
								{
									type: 'element',
									tagName: 'figcaption',
									properties: {},
									children: [{ type: 'text', value: alt.trim() }],
								},
							],
						};
					}
				}

				transform(child);
				return child;
			});
		};

		transform(tree);
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://parkerhurst.com',
	markdown: {
		rehypePlugins: [rehypeImageCaptions],
	},
});
