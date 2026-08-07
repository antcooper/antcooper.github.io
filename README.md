# antcooper.com

A small static blog. Markdown files go in, a website comes out. Built with
[Eleventy](https://www.11ty.dev/), published to GitHub Pages by GitHub Actions
on every push to `main`.

## Writing a new post

1. Add a markdown file to `posts/`. **The filename becomes the URL**, so
   `posts/my-new-post.md` is published at `/blog/my-new-post/`.
2. Commit and push.
3. Wait about a minute. The site rebuilds itself.

That's the whole workflow. There is nothing to run and nothing to install —
which is what makes it work from an iPad in
[Working Copy](https://workingcopy.app/).

### The front matter

Every post starts with a block between `---` lines:

```markdown
---
title: Printing straight into Evernote on macOS
description: A quick tip to send a PDF straight to Evernote from the print dialog.
date: 2025-12-08
tags:
  - macOS
  - Evernote
---

The post itself starts here, in normal markdown.
```

| Field | Required | What it does |
| --- | --- | --- |
| `title` | yes | Heading, page title, and the link on the home page. |
| `date` | yes | `YYYY-MM-DD`. Controls the ordering. |
| `description` | no | The larger intro paragraph under the title. Also used for the home page summary, search results, and link previews. |
| `tags` | no | Creates `/tags/macos/` etc. automatically. |
| `image` | no | A banner image shown above the post, e.g. `/assets/images/photo.jpg`. |
| `imageAlt` | no | Alt text describing the banner image. |
| `redirectFrom` | no | Old URLs that should forward here. Used for the micro.blog addresses. |
| `featured` | no | Set to `true` to pin this post as the yellow note at the top of the home page. If more than one post is marked, the newest wins. |
| `featuredNote` | no | Short line shown on that note. Falls back to `description`, which is usually too long for it. |

> **Careful with `#` and `:`** — if a title or description contains either, wrap
> the whole value in double quotes, or YAML will misread it:
> `title: "Mapping § to # on a British keyboard"`

## Images

Drop them in `assets/images/` and reference them from a post:

```markdown
![Description of the picture](/assets/images/my-screenshot.png)
*An optional italic line directly underneath becomes the caption.*
```

You don't need to resize anything first. The build generates WebP versions at
several widths and serves the right one, so a full-size photo straight off an
iPad is fine. Keep the originals reasonable (under ~2000px wide) just to stop
the repository getting heavy to clone.

Downloadable files (zips, PDFs) go in `assets/files/`.

## Editing the site itself

| I want to change... | Look in |
| --- | --- |
| Colours, fonts, spacing | `assets/css/style.css` — the tokens at the very top cover most of it |
| Site title, description, nav button | `_data/site.js` |
| Page structure | `_layouts/base.njk`, `post.njk`, `page.njk` |
| The home page listing | `index.njk` |
| How many posts per page | `size: 3` in `index.njk`'s front matter |
| About text | `pages/about.md` |
| Build behaviour | `eleventy.config.js` |

## Running it locally (optional — Mac only)

```bash
npm install
npm start
```

Then open http://localhost:8080. It reloads as you save.

To do a one-off production build into `_site/`:

```bash
npm run build
```

## How publishing works

`.github/workflows/deploy.yml` runs on every push to `main`: it installs
dependencies, runs the Eleventy build, and uploads `_site/` to GitHub Pages.
If a build ever fails, the previous version of the site stays up and the
Actions tab will show what went wrong.

## Going live on antcooper.com

The site currently publishes to <https://antcooper.github.io/>. `antcooper.com`
still points at micro.blog, and nothing here affects it until you change DNS.

The custom domain is deliberately **not** set yet: as soon as GitHub Pages knows
about it, the `github.io` address starts redirecting there — which would leave
you unable to preview. So the switch is one step, done when you're ready:

1. At your DNS provider, point `antcooper.com` at GitHub Pages. Four `A` records
   on the apex:

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   And a `CNAME` for `www` pointing to `antcooper.github.io`.

2. Add a file called `CNAME` in the root of this repository containing exactly:

   ```
   antcooper.com
   ```

   Commit and push it. The build already knows to copy that file through, and
   GitHub Pages picks up the domain from it.

3. In the repo's **Settings → Pages**, tick *Enforce HTTPS* once the certificate
   has been issued (usually within an hour).

Until step 2 happens, `antcooper.github.io` serves the site normally.

## URLs and redirects

Posts live at `/blog/<filename>/`. The old micro.blog addresses
(`/2025/12/08/printing-straight-into-evernote-on.html`) still work: each post
lists them under `redirectFrom`, and the build generates a small forwarding page
for each one. Feeds stayed where they were, at `/feed.xml` and `/feed.json`, so
existing subscribers don't notice the move.
