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

## Hosting

The site runs on Cloudflare Workers and uses Cloudflare Web Analytics.
Pushes to `main` build and deploy the site through GitHub Actions and Terraform.

## Infrastructure

Terraform files are in `infra/`:

- `main.tf` sets the Terraform version, Cloudflare provider, and HCP state storage.
- `worker.tf` defines the Worker, uploads `dist/` as a version, and sends all traffic to that version.
- `domain.tf` connects the main domain and redirects HTTPS requests from `www` to it.
- `analytics.tf` manages Cloudflare Web Analytics. Cloudflare adds the tracking script to the site.

GitHub Actions runs `pnpm build`, then Terraform init, a format check, and apply.
Terraform runs in GitHub Actions; HCP Terraform stores and locks its state.

The workflow uses the `TF_API_TOKEN` and `CLOUDFLARE_API_TOKEN` repository secrets,
and the `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID`, and `DOMAIN` repository variables.
