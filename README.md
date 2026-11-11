# The Commits

Website for [The Commits](https://github.com/Render-Atlanta/the-commits), the RenderATL award show. The app is a [Next.js](https://nextjs.org) 15 site (App Router, React 19) whose pages are composed in [Makeswift](https://www.makeswift.com). This repository holds the design system, the custom sections the builder can drop onto a page, and the fallback content for winners and sponsors.

Page copy and layout live in Makeswift. Shipping a new section, a visual change, or a change to hardcoded content is a code change in this repo, followed by a deploy. Publishing copy in the Makeswift builder updates the live site through the app’s Makeswift API route and does not require a git commit.

## Run it locally

Requirements: Node.js 18.18 or newer, and [pnpm](https://pnpm.io) 9.15.2 (`packageManager` in `package.json`).

```bash
pnpm install
cp .env.example .env.local
```

Put the site API key in `.env.local`. In the Makeswift builder, open **Settings → Host** and copy the key.

```bash
MAKESWIFT_SITE_API_KEY=your_key
```

```bash
pnpm dev
```

The app serves at [http://localhost:3000](http://localhost:3000). Point the Makeswift host URL at `http://localhost:3000`, then open a page in the visual builder. The builder loads this dev server in an iframe, so registered components and draft content show up as you edit.

`pnpm build` also needs `MAKESWIFT_SITE_API_KEY`. The catch-all page asks Makeswift for every published page while it generates static paths.

| Script | What it does |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build. Fetches published Makeswift pages. |
| `pnpm start` | Serves the production build |
| `pnpm lint` | `next lint` |
| `pnpm icons` | SVGR pass from `public/icons` into `generated/icons`. That folder is empty today; run this only after adding icons. |

## How the site runs with Makeswift

```
Makeswift builder  ──iframe──▶  Next.js app (this repo)
       │                              │
       │  component descriptors,      │  getPageSnapshot(path)
       │  draft preview, publish      │  <Page snapshot={...} />
       └──────── /api/makeswift/* ────┘
```

1. `lib/makeswift/runtime.ts` creates the Makeswift runtime and the builder breakpoints.
2. Each custom section registers itself in a sibling `*.makeswift.ts` file. `lib/makeswift/components.ts` imports every registration. The root layout, the client provider, and the API route all import that barrel, so the builder and the rendered site share one component map.
3. `app/[[...path]]/page.tsx` is the only public page route. It loads a snapshot for the URL and renders it. At build time, `generateStaticParams` prebuilds every page Makeswift already knows about. A path Makeswift adds later can still render on demand.
4. `app/api/makeswift/[...makeswift]/route.ts` is the bridge. It serves component metadata to the builder, turns on draft preview, lists the site fonts, and revalidates pages when someone publishes.
5. `next.config.js` wraps the Next config with `withMakeswift()`. Leave that wrapper in place.

`getSiteVersion()` decides whether a request sees draft or published content. The root layout passes that value into `MakeswiftProvider`, and the page passes it into `getPageSnapshot`.

### Environment

| Variable | Required | Role |
| --- | --- | --- |
| `MAKESWIFT_SITE_API_KEY` | Yes | Server-only key from **Settings → Host**. Build and the API route both throw without it. |
| `NEXT_PUBLIC_MAKESWIFT_API_ORIGIN` | No | Override for the Makeswift API. Leave unset to use the default. |
| `NEXT_PUBLIC_MAKESWIFT_APP_ORIGIN` | No | Override for the builder origin. Leave unset to use the default. |

Keep real keys in `.env.local` or the host’s environment. `.env*` files are gitignored except `.env.example`.

## Repository map

```
app/
  layout.tsx                         Fonts, global CSS, Makeswift provider
  globals.css                        Color tokens and base element styles
  [[...path]]/page.tsx               Every Makeswift page
  api/makeswift/[...makeswift]/      Builder bridge, preview, publish revalidation
  preview-past-winners/              Local preview of the winners grid
  preview-past-winners-carousel/     Local preview of the winners carousel
components/<Name>/
  <Name>.tsx                         React section
  <Name>.makeswift.ts                Builder registration and controls
  index.ts                           Public export
lib/makeswift/
  runtime.ts                         Runtime and breakpoints
  client.ts                          Server client (needs the API key)
  provider.tsx                       Client provider for draft preview
  components.ts                      Side-effect imports of every registration
public/
  Nippo-Variable.woff2               Heading font
  Supreme-Variable.woff2             Body font
  winners/                           Photos and logos for the 2026 fallback set
```

Path aliases live in `tsconfig.json`: `@/components/*`, `@/lib/*`, `@/generated/*`, `@/styles/*`.

A marketing URL is a page in Makeswift, not a new file under `app/`. Add an `app/` route only for something the builder should not own, such as a local component preview.

## Design system

The look is a small custom system on Tailwind CSS 3. There is no third-party component kit.

Color tokens are HSL components in `app/globals.css`, mapped in `tailwind.config.js`:

| Token | Value | Use |
| --- | --- | --- |
| `background` | `0 0% 0%` | Page background, black |
| `foreground` | `0 0% 100%` | Text and hairline borders, white |
| `primary` | `40 60% 50%` | Gold accent, hover, focus |
| `border` | `0 0% 28%` | Section and card borders |

Fonts, loaded in `app/layout.tsx` and exposed as CSS variables:

| Role | Family | Tailwind |
| --- | --- | --- |
| Headings | Nippo (variable, `public/Nippo-Variable.woff2`) | `font-heading` |
| Body | Supreme (variable, `public/Supreme-Variable.woff2`) | `font-body` |
| Mono accents | Space Mono (Google) | `font-mono` |

The Makeswift API route registers Nippo and Supreme, under the CSS variables, so the builder’s font picker can select them.

Shared habits across sections:

- Uppercase Nippo for headings and buttons.
- Hairline borders at `border-foreground/40`, tightening to `border-foreground` or `border-primary` on hover or open.
- Gold square with a corner arrow on buttons and link rows.
- Page padding `px-6 sm:px-8 md:px-12 xl:px-20`.
- Focus rings: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
- Inline logos use `currentColor` so they follow `text-foreground` and turn gold on hover.

`app/globals.css` also restyles native `label`, `input`, and `button[type=submit]` elements. Makeswift’s built-in form controls render those elements, so those rules are part of the form styling.

Accordion and marquee motion live in `tailwind.config.js` (`collapse`, `expand`, `scrollLeft`, `scrollRight`), with `tailwindcss-animate` and `@tailwindcss/container-queries` installed.

Radix is used only where a section needs it: `@radix-ui/react-accordion` and `@radix-ui/react-tabs`. Class names are composed with `clsx`.

Builder breakpoints, in `lib/makeswift/runtime.ts`, are separate from Tailwind’s defaults:

| Makeswift | Width | Canvas |
| --- | --- | --- |
| Mobile | 575 | 390 |
| Tablet | 768 | 765 |
| Laptop | 1024 | 1000 |
| External | 1280 | 1280 |

Tailwind’s `sm` starts at 640. A section that changes at `sm` will not flip at the builder’s Mobile frame. Match the breakpoint you intend in both places when a layout has to line up with the builder frames.

## Custom components

Registering a component is what makes it appear in the builder. The `type` string is the id stored on existing pages. Renaming it detaches those pages from the component.

| Folder | Builder label | `type` | What editors can change |
| --- | --- | --- | --- |
| `Accordions` | Accordions | `accordions` | Items, title, slotted body, single or multiple open |
| `AnimatedEyebrowText` | Animated Eyebrow Text | `AnimatedEyebrowText` | Text, color, size, alignment. Scrambles in when fully on screen. |
| `Button` | Button | `Button` | Label, link, black or white. Registers the link button. |
| `ButtonGroup` | Button Group | `ButtonGroup` | A list of those buttons, plus gap |
| `LinkList` | Link List | `LinkList` | Stacked oversized links |
| `Marquee` | Marquee | `Marquee` | Logo, alt, text, size, speed, direction, edge fade |
| `Navigation` | Site Header | `navigation` | Logo, alt, width, link, eyebrow text, CTA |
| `PastWinners` | Past Winners | `past-winners` | Heading, intro, optional year, winner list |
| `PastWinnersCarousel` | Past Winners Carousel | `past-winners-carousel` | Same fields, laid out as a carousel |
| `SponsoredBy` | Sponsored by | `sponsored-by` | Heading only. Logos are in code. |
| `Tabs` | Custom / Tabs | `Tabs` | Tab title and slotted panel |
| `TrophyStickyContainer` | Trophy Sticky Container | `TrophyStickyContainer` | Slotted sections beside a fixed Spline trophy |

Makeswift still provides its own primitives (text, image, box, form, and so on). Those are not registered here.

### Winners

`components/PastWinners/winners.ts` is the 2026 fallback, with images in `public/winners/`. The grid and the carousel both use it when the Makeswift **Winners** list is empty. Adding any winner in the builder replaces that set for that component instance.

Order is newest year first, then the category order in `components/PastWinners/award-categories.ts` (Lifetime Achievement first). `yearFilter` limits the list to one year; a blank filter shows every year. Social icons render only when that URL is set. Project links open in a new tab after `normalizeUrl` checks the protocol.

The carousel reuses the same types, grouping, and social links. Its category select is the same list, re-exported from `components/PastWinnersCarousel/categories.ts`.

### Sponsors and the trophy

Sponsor logos, names, and URLs are the `sponsors` array in `components/SponsoredBy/SponsoredBy.tsx`, drawn by the SVG components in `logos.tsx`. Editors can change the heading in Makeswift and cannot add a logo from the builder.

The trophy is a Spline scene URL hardcoded in `components/TrophyStickyContainer/TrophyStickyContainer.tsx`. Editors fill the sections beside it with slotted content.

## Previewing

Two kinds of preview are in play.

**Component previews** render a section with sample props and skip Makeswift. They exist so a section can be checked before it is dropped on a page:

- [http://localhost:3000/preview-past-winners](http://localhost:3000/preview-past-winners)
- [http://localhost:3000/preview-past-winners-carousel](http://localhost:3000/preview-past-winners-carousel)

These routes are more specific than `app/[[...path]]`, so they win. Keep new ones under `app/preview-<name>/` so they cannot collide with a published URL.

**Builder preview** is the Makeswift iframe against the running app. With `pnpm dev` up and the host URL set to `http://localhost:3000`, opening a page in the builder shows draft content through `getSiteVersion()`. Publish webhooks do not reach localhost, so a local session is for editing and previewing, not for testing on-demand revalidation.

## Deploying

This repo has no CI workflow and no `vercel.json`. `.vercel` is gitignored, which matches a Vercel project linked on a machine. Vercel is the host Makeswift documents for this setup.

1. Import `https://github.com/Render-Atlanta/the-commits.git` as a Vercel project. The install command is `pnpm install` and the build command is `pnpm build`.
2. Set `MAKESWIFT_SITE_API_KEY` in the Vercel project. The build fetches pages, so the key has to be present at build time.
3. After the first successful deploy, set the Makeswift host URL to the production origin, for example `https://your-domain.com`. The host is an origin only; it cannot include a path.
4. Publishing in Makeswift calls `/api/makeswift/[...makeswift]` on that host and revalidates the affected pages. A copy change does not need a new git deploy. A new component, a style change, or an edit to fallback winners or sponsors does.

Code lands on `main`. Content lands when an editor publishes in Makeswift against the deployed host.

## Formatting

Prettier is configured in `.prettierrc.json`: no semicolons, single quotes, 100-character lines, Tailwind class sorting, and imports ordered as React/Next, third-party packages, `@/…`, then relative paths. ESLint extends `next` and `next/core-web-vitals`.
