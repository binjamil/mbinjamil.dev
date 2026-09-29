resource "cloudflare_web_analytics_site" "site_analytics" {
  account_id   = var.account_id
  zone_tag     = var.zone_id
  auto_install = true
  enabled      = true
}
