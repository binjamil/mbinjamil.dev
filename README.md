# mbinjamil.dev

Static Astro blog. Articles live in
`src/content/writings/` as Markdown or MDX; filenames determine their URLs.

## Development

Use the Node version in `.nvmrc` and the pnpm version in `package.json`:

```sh
nvm use
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm build` generates `dist/`. `pnpm preview` serves the production build locally.
The site has no analytics, server functions, or database dependency.
