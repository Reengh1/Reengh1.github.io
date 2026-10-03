# GuangChen Li — Academic Homepage

This site uses the **Home Layout 2** design from [academic-homepage](https://github.com/luost26/academic-homepage). The default homepage includes a profile, Education and Awards in one card, News, and Publications. The navigation is Home / Publications / Travelogue. Blog, experience, and demo showcase content have been removed.

## Preview locally

With Ruby and Bundler installed, run from this folder:

```sh
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000/. The old Next.js site remains in the parent folder; its `npm run dev` command previews the old site.

## Update academic content

- `_data/profile.yml`: name, biography, contacts, portrait, education, and awards.
- `_news/`: News entries. Use `date_display` to preserve month-only dates.
- `_publications/`: publication entries. Keep submission status explicit.
- `_data/authors.yml`: author names, emphasis, and profile links.

## Add travel photos

1. Keep original uploads in `pic/`. This source folder is excluded from the built site.
2. Put web-ready photos in `assets/images/travel/`, with smaller previews in its `thumbs/` subfolder. The current gallery uses WebP images without changing the originals.
3. Add an entry to `_data/travel.yml` with `image`, `thumbnail`, title, location, and a short image description (`alt`). Set `width` and `height` to the thumbnail dimensions to reserve space before it loads. Dates and captions are optional; source filenames are preserved in comments.

Travelogue displays a responsive photo wall at the photos’ natural proportions. Clicking a photo opens a larger viewer; use the arrow keys to browse and Escape to close.

Location notes: the photograph named `北京雍和宫 2.jpg` shows the Hall of Prayer for Good Harvests at the Temple of Heaven. [Pretty Place Chapel](https://www.campgreenville.org/frequently-asked-questions) is in Cleveland, SC; [Pacific Park](https://pacpark.com/visit/directions/) is on Santa Monica Pier. The Japanese forest series is labeled Kurosawa Onsen, Japan, as supplied by the photographer.

## Effects

`assets/css/enhancements.css` and `assets/js/enhancements.js` provide sparse drifting particles, soft blue/lavender background halos, card hover glow, scroll reveals, and a reading progress line. Mobile screens show fewer particles, and particles pause when the page is hidden. Reduced-motion preferences disable the animated particles; content remains visible without JavaScript.

## GitHub Pages

The parent repository's `.github/workflows/deploy.yml` builds this folder with Jekyll and derives the base URL from GitHub Pages settings. The workflow runs on pushes to `main` or manual dispatch. Editing files locally does not publish them.

## Education badge sources

- [University of Michigan seal](https://commons.wikimedia.org/wiki/File:Seal_of_the_University_of_Michigan.svg) — Wikimedia Commons, sourced from the university.
- [Renmin University of China emblem](https://www.ruc.edu.cn/xuexiaobiaozhi1924747550510977025.html) — university identity page; the circular emblem is centered in the original asset, with surrounding whitespace hidden by CSS.
- [UC Davis seal](https://communicationsguide.ucdavis.edu/brand-guide/logos/uc-davis-seal) — university brand guide.

Body text uses the original template's Lato font, with Source Code Pro for email text. The Chinese profile name uses a small webfont subset derived from [LXGW WenKai / 霞鹜文楷](https://github.com/lxgw/LxgwWenKai), renamed Homepage WenKai and limited to `（李光宸）`. Its original OFL license is included in `assets/fonts/OFL-wenkai.txt`; regenerate the subset if the Chinese name changes. License and original template credit are retained.
