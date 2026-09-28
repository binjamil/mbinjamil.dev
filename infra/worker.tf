resource "cloudflare_worker" "site" {
  account_id = var.account_id
  name       = "mbinjamil-dev"

  subdomain = {
    enabled          = true
    previews_enabled = false
  }
}

resource "cloudflare_worker_version" "site_version" {
  account_id         = var.account_id
  worker_id          = cloudflare_worker.site.id
  compatibility_date = "2026-09-28"

  assets = {
    directory = abspath("${path.module}/../dist")
  }
}

resource "cloudflare_workers_deployment" "site_deployment" {
  account_id  = var.account_id
  script_name = cloudflare_worker.site.name
  strategy    = "percentage"

  versions = [{
    percentage = 100
    version_id = cloudflare_worker_version.site_version.id
  }]
}
