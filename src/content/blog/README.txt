Create each article in its own directory:

  src/content/blog/my-article/index.md
  src/content/blog/my-article/cover.jpg

Copy article-template/index.md.example to <slug>/index.md to start a new
article. The .example suffix keeps the template out of the blog collection.

Use this frontmatter in index.md:

  ---
  title: My Article
  description: A short summary used on the blog index and in search previews.
  publishedAt: 2026-07-12
  updatedAt: 2026-07-13 # optional
  draft: true
  cover: ./cover.jpg      # optional
  coverAlt: Description of the cover image
  ---

Set draft to false when the article is ready to publish. Images in the article
body can also use relative paths, for example: ![Alt text](./photo.jpg).
