# The Commits — agent guide

This is the RenderATL award-show site. Next.js 15 App Router, React 19, Tailwind 3, and Makeswift. Pages are content in Makeswift. This repo is the design system and the custom sections the builder can place.

Read this file before editing. The README is the human tour of the same system; follow the contracts below when you change code.

## Commands

Package manager is pnpm 9.15.2 (`package.json` `packageManager`). Use `pnpm install` and `pnpm <script>`. A `package-lock.json` is also checked in; do not refresh it.

```bash
pnpm dev       # http://localhost:3000
pnpm lint
pnpm build     # requires MAKESWIFT_SITE_API_KEY
pnpm start
```

`MAKESWIFT_SITE_API_KEY` lives in `.env.local` (see `.env.example`). `lib/makeswift/client.ts` and the Makeswift API route throw at import time when it is missing, so `pnpm dev` and `pnpm build` both fail without it. Do not commit `.env`, `.env.local`, or any real key.

There is no test runner. After a UI change, run `pnpm lint` and load the relevant preview route or the Makeswift page in the browser. `pnpm build` is the check that static generation still reaches Makeswift.

## Map

```
app/layout.tsx                              fonts + MakeswiftProvider
app/globals.css                             tokens and base element styles
app/[[...path]]/page.tsx                    the only public page route
app/api/makeswift/[...makeswift]/route.ts   builder bridge
app/preview-*/page.tsx                      local component previews
components/<Name>/<Name>.tsx                section
components/<Name>/<Name>.makeswift.ts       runtime.registerComponent
components/<Name>/index.ts                  export the React component
lib/makeswift/runtime.ts                    ReactRuntime + breakpoints
lib/makeswift/client.ts                     server Makeswift client
lib/makeswift/provider.tsx                  client provider, siteVersion
lib/makeswift/components.ts                 import every *.makeswift.ts
public/Nippo-Variable.woff2                 font-heading
public/Supreme-Variable.woff2               font-body
public/winners/                             fallback winner images
```

Aliases: `@/components/*`, `@/lib/*`, `@/generated/*`, `@/styles/*`.

Do not add a second catch-all. A public URL is a Makeswift page. Add a file under `app/` only for a non-CMS route (a preview, an API route).

## How a request renders

1. `app/[[...path]]/page.tsx` joins `params.path` into a pathname and calls `client.getPageSnapshot(path, { siteVersion: getSiteVersion() })`.
2. A missing snapshot returns `notFound()`.
3. `<MakeswiftPage snapshot={snapshot} />` renders the builder tree, including registered components.
4. `generateStaticParams` calls `client.getPages().toArray()` and prebuilds those paths. Leave that in place so published pages are static.
5. Root layout awaits `getSiteVersion()` and passes it to `MakeswiftProvider` as `siteVersion`. That is what lets the builder iframe show drafts. Keep the provider outside `{children}` and keep the `RootStyleRegistry` inside it.
6. `app/api/makeswift/[...makeswift]/route.ts` exports the same `MakeswiftApiHandler` as `GET`, `POST`, and `OPTIONS`. It is how the builder reads component descriptors, enables preview, and revalidates on publish. It also returns the font list (Nippo, Supreme).

`next.config.js` must keep `module.exports = withMakeswift(nextConfig)`.

Optional origins, forwarded by the client, the provider, and the handler:

- `NEXT_PUBLIC_MAKESWIFT_API_ORIGIN`
- `NEXT_PUBLIC_MAKESWIFT_APP_ORIGIN`

Leave them unset unless you are deliberately pointing at a non-production Makeswift environment.

`getSiteVersion()` is legal only in a Server Component or route handler. Do not call it from a client component.

## Makeswift component contract

Every custom section follows the same three files. `Accordions` and `Tabs` are the exception: they `lazy(() => import('./X'))` because the React file is a default export. New sections should use a named export and register it directly, matching `Button` and `PastWinners`.

Registration checklist:

1. Build the visual component in `components/<Name>/<Name>.tsx`. Add `'use client'` when it uses state, effects, refs, or browser APIs.
2. Register it in `components/<Name>/<Name>.makeswift.ts` with `runtime.registerComponent` from `@/lib/makeswift/runtime`.
3. Re-export the React component from `components/<Name>/index.ts`. Do not export the registration from the barrel that app code imports.
4. Add a side-effect import of the `*.makeswift.ts` file to `lib/makeswift/components.ts`. The layout, the provider, and the API route already import that barrel. A component missing from the barrel will not appear in the builder and will not render on the page.

Controls come from `@makeswift/runtime/controls`. Match the prop names to the React props exactly.

- Text: `TextInput`, `TextArea`
- Choice: `Select`
- URL: `Link` (value shape `{ href, target }`)
- Image: `Image({ format: Image.Format.WithDimensions })` (value shape `{ url, dimensions }`)
- Nested editable region: `Slot()`
- Repeatable items: `List` of `Group`, with `getItemLabel`
- Spacing override: `Style()` or `Style({ properties: [Style.Margin] })`

`type` is the persistent id stored in Makeswift documents. Treat these as frozen:

| Folder | `type` | Builder label |
| --- | --- | --- |
| `Accordions` | `accordions` | Accordions |
| `AnimatedEyebrowText` | `AnimatedEyebrowText` | Animated Eyebrow Text |
| `Button` | `Button` | Button |
| `ButtonGroup` | `ButtonGroup` | Button Group |
| `LinkList` | `LinkList` | Link List |
| `Marquee` | `Marquee` | Marquee |
| `Navigation` | `navigation` | Site Header |
| `PastWinners` | `past-winners` | Past Winners |
| `PastWinnersCarousel` | `past-winners-carousel` | Past Winners Carousel |
| `SponsoredBy` | `sponsored-by` | Sponsored by |
| `Tabs` | `Tabs` | Custom / Tabs |
| `TrophyStickyContainer` | `TrophyStickyContainer` | Trophy Sticky Container |

Changing `type`, or removing a prop the builder already saves, orphans or blanks existing pages. Add new optional props with defaults. The `description` strings on `PastWinners`, `PastWinnersCarousel`, and `SponsoredBy` are the help text editors see in the builder; update them when editor-facing behavior changes.

`Button.makeswift.ts` registers `LinkButton`, and it exports `props` so `Navigation` and `ButtonGroup` reuse the same text, link, and color controls. Extend that shared `props` object instead of duplicating the control config.

The builder has its own text, image, box, and form primitives. Do not re-register those.

## Content ownership

Decide where a change belongs before editing.

**Makeswift, not this repo:** page list, section order, most headings and body copy, nav logo and CTA, marquee items, accordion and tab content, button labels and links.

**This repo:**

- Fallback winners: `components/PastWinners/winners.ts` plus files in `public/winners/`. Used only when that component’s Makeswift winners list is empty. The first editor-added winner replaces the whole fallback for that instance. Grid and carousel share `PAST_WINNERS`, `Winner` (`components/PastWinners/types.ts`), and `groupWinners`.
- Category order and labels: `components/PastWinners/award-categories.ts`. The carousel re-exports it from `components/PastWinnersCarousel/categories.ts`. Order in that array is display order (Lifetime Achievement first). `categoryLabel` returns nothing for an unknown value, so a new category has to be added here or the card will omit the label. The 2026 fallback does not currently include `corporate-contributor-of-the-year`; the select still offers it.
- Sponsors: `components/SponsoredBy/SponsoredBy.tsx` (`sponsors` array) and `components/SponsoredBy/logos.tsx`. The builder can edit the heading only. New logos are SVG components that use `currentColor` and `aria-hidden`, added to `sponsors` with `name`, `href`, and `Logo`.
- Trophy scene: the Spline URL in `components/TrophyStickyContainer/TrophyStickyContainer.tsx`. Sections beside it are slots.

`groupWinners` sorts by year descending, then category rank, then original index. `yearFilter` matches a four-digit year inside the string. `normalizeUrl` allows http(s) and site-relative paths, prefixes a scheme when one is missing, and drops `javascript:`, `data:`, and `vbscript:`. Keep using it for any winner or social href.

External links use `target="_blank"` and `rel="noopener noreferrer"`, with an accessible name that says a new tab will open.

## Design system

Use the tokens. Do not introduce a new palette, font, or component library.

Tokens in `app/globals.css` (`:root`), consumed as Tailwind colors:

- `bg-background` / `text-background` — black, `hsl(0 0% 0%)`
- `text-foreground` / `border-foreground` — white, `hsl(0 0% 100%)`. Borders are usually `/40` or `/25`.
- `bg-primary` / `text-primary` / `ring-primary` — gold, `hsl(40 60% 50%)`. The eyebrow default hex `#CC9933` is this gold.
- `border-border` — `hsl(0 0% 28%)`

Fonts: `font-heading` (Nippo), `font-body` (Supreme), `font-mono` (Space Mono). Headings and buttons are uppercase Nippo, usually `font-light`. Eyebrow labels are small uppercase heading type with wide tracking, often wrapped in the animated eyebrow component (`[ scrambled text ]`).

Section padding used by full-bleed blocks: `px-6 py-16 sm:px-8 md:px-12 md:py-24 xl:px-20 xl:py-28`.

Interactive pattern: hairline `border-foreground/40`, hover to `border-foreground`, gold fill on the arrow square, 300ms `ease-out`. Focus ring, copied in the winners and sponsor sections:

```tsx
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
```

`app/globals.css` restyles `label`, `input`, and `button[type=submit]` because Makeswift’s built-in form renders those elements. Leave those rules in place when you edit the file.

Motion: accordion open/close uses `animate-expand` / `animate-collapse`. Marquee uses `animate-scrollLeft` and `--marquee-duration`. Both keyframes are in `tailwind.config.js`.

Builder frames (`lib/makeswift/runtime.ts`) are Mobile 575 (canvas 390), Tablet 768 (canvas 765), Laptop 1024 (canvas 1000), External 1280. Tailwind `sm` is 640, `md` 768, `lg` 1024, `xl` 1280. Components respond with Tailwind classes, not with Makeswift responsive control values. When a layout must match a builder frame, do not assume `sm` equals the Mobile frame.

Radix is already the behavior layer for accordion and tabs. Reach for it for new keyboard-managed widgets; do not add another headless kit. Compose classes with `clsx`.

Prettier (`.prettierrc.json`): no semicolons, single quotes, print width 100, Tailwind class sorting, import groups `react`/`next`, third party, `@/`, relative. ESLint extends `next` and `next/core-web-vitals`.

## Previews

**Local component preview.** Add `app/preview-<slug>/page.tsx` that imports the React component and passes sample props. Open `/preview-<slug>` on the dev server. The current ones:

- `app/preview-past-winners/page.tsx`
- `app/preview-past-winners-carousel/page.tsx`

A specific `app/preview-…` route beats `app/[[...path]]`. Keep the `preview-` prefix so the path cannot shadow a real Makeswift page. Do not register preview routes in Makeswift, and do not link them from the public nav.

**Builder preview.** `pnpm dev`, then in Makeswift set **Settings → Host** to `http://localhost:3000` and open the page. The iframe is this dev server. Drafts flow through `getSiteVersion()`. If a new component is missing in the builder, confirm its import in `lib/makeswift/components.ts` and that the dev server recompiled. Publish webhooks cannot target localhost, so do not use a local session to verify revalidation.

## Deploys

No GitHub Actions workflow and no `vercel.json` are checked in. `.vercel` is gitignored. Production is a Vercel project built with pnpm from `main`.

- Set `MAKESWIFT_SITE_API_KEY` on the Vercel project for the environments that build. `generateStaticParams` calls Makeswift during `pnpm build`.
- After deploy, the Makeswift host URL must be the production origin (`https://…`, no path). The builder and the publish webhook call that origin.
- Publishing in Makeswift hits `/api/makeswift/[...makeswift]` and revalidates pages. Copy-only changes do not need a commit or a redeploy.
- Component, style, token, sponsor, trophy, and fallback-winner changes need a deploy. Editors will not see a new `type` until the deployment serving the host URL includes the registration.

Do not add a second host, a Dockerfile, or a CI config unless asked. Do not put the API key in the repo to make a build pass.

## Editing rules of thumb

- Preserve `type` ids, control prop names, and the `components.ts` import list.
- Fallback images are root-relative (`/winners/kelsey-hightower.jpg`). `next/image` serves files from `public/` that way. When you add a fallback winner, add the file under `public/winners/` and point `image.url` at it.
- Winner cards link the whole card to the project URL. Social links sit outside that link so they are not nested anchors. Keep that split in both the grid and the carousel.
- `useIsInBuilder()` is how the winners sections stay visible in the builder when the filtered list is empty. A new section that would `return null` with empty CMS data should do the same, or editors cannot select it.
- The carousel measures its scroller to enable previous/next. Test it at a phone width and at `lg`. Card width classes are in `PastWinnersCarousel.tsx` (`slideWidth`).
- `pnpm icons` expects `public/icons` and writes `generated/icons`. Neither exists today. Do not run it as a drive-by.
- Space Mono is loaded with `next/font/google` in `app/layout.tsx`. Nippo and Supreme are `next/font/local` from `public/`. Wire new font variables through the layout and, if editors should pick the font, through `getFonts()` on the API route.

## Verification

For a section change:

1. `pnpm lint`
2. Load the local preview route, or the Makeswift page if the section has no preview.
3. Check the empty state (no items) and the populated state.
4. Check a narrow viewport and one desktop width. Winners, the carousel, the sponsor wall, and the trophy container are the layouts most likely to overflow.

For a registration change, also confirm the component is listed in the builder after the dev server recompiles, and that a page which already uses it still renders.
