import { DateTime } from "luxon";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import rssPlugin from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  // --- Static files -------------------------------------------------------
  // Images are referenced from markdown as /assets/images/foo.jpg, so the
  // folder is copied through with its paths intact.
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/files");
  eleventyConfig.addPassthroughCopy("assets/css");
  eleventyConfig.addPassthroughCopy("assets/favicon");
  // CNAME is added at the point antcooper.com's DNS is switched over —
  // see "Going live on antcooper.com" in the README.
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Re-run the dev server when CSS changes.
  eleventyConfig.addWatchTarget("assets/css/");

  // --- Plugins ------------------------------------------------------------
  eleventyConfig.addPlugin(rssPlugin);

  // Rewrites every <img> in the built HTML into a responsive <picture> with
  // WebP variants. This is what lets you drop a full-size photo straight from
  // an iPad into assets/images without thinking about file size.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "auto"],
    // The column is 640px, so 1200 already covers a 2x retina display.
    // Generating the full 2000px original would just be wasted bandwidth.
    widths: [400, 800, 1200],
    failOnError: false,
    // The reading column is 40rem, so never ask the browser for more than
    // that on desktop. Individual images can override these attributes.
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "(max-width: 40rem) 100vw, 640px",
    },
  });

  // --- Collections --------------------------------------------------------
  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date)
  );

  // Posts marked `featured: true`. The newest one becomes the note pinned to
  // the top of the home page.
  eleventyConfig.addCollection("featured", (collection) =>
    collection
      .getFilteredByGlob("posts/*.md")
      .filter((post) => post.data.featured)
      .sort((a, b) => b.date - a.date)
  );

  // Every tag used across all posts, alphabetically, for the tag pages.
  eleventyConfig.addCollection("tagList", (collection) => {
    const tags = new Set();
    for (const post of collection.getFilteredByGlob("posts/*.md")) {
      for (const tag of post.data.tags || []) tags.add(tag);
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  });

  // Every post's `redirectFrom` entries, flattened into one list that
  // redirects.njk turns into stub pages.
  eleventyConfig.addCollection("redirects", (collection) => {
    const out = [];
    for (const post of collection.getFilteredByGlob("posts/*.md")) {
      for (const from of post.data.redirectFrom || []) {
        out.push({ from, to: post.url });
      }
    }
    return out;
  });

  // --- Filters ------------------------------------------------------------
  const utc = (d) => DateTime.fromJSDate(d, { zone: "utc" });

  // 8 December 2025
  eleventyConfig.addFilter("readableDate", (d) => utc(d).toFormat("d LLLL yyyy"));

  // 2025-12-08, for <time datetime="…">
  eleventyConfig.addFilter("machineDate", (d) => utc(d).toFormat("yyyy-LL-dd"));

  // 2025, for grouping the archive
  eleventyConfig.addFilter("year", (d) => utc(d).toFormat("yyyy"));

  // Group a list of posts into [{ year, posts }], newest year first.
  eleventyConfig.addFilter("byYear", (posts) => {
    const years = new Map();
    for (const post of posts) {
      const y = utc(post.date).toFormat("yyyy");
      if (!years.has(y)) years.set(y, []);
      years.get(y).push(post);
    }
    return [...years.entries()]
      .map(([year, posts]) => ({ year, posts }))
      .sort((a, b) => b.year - a.year);
  });

  // Plain-text excerpt for feeds and meta descriptions.
  eleventyConfig.addFilter("striptags", (content) =>
    String(content || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
  );

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
