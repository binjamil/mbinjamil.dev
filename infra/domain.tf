resource "cloudflare_workers_custom_domain" "site_domain" {
  account_id = var.account_id
  hostname   = var.domain
  service    = cloudflare_worker.site.name
}

# https://developers.cloudflare.com/workers/configuration/routing/custom-domains/#redirect-between-www-and-root-domain
resource "cloudflare_dns_record" "www" {
  zone_id = var.zone_id
  name    = "www.${var.domain}"
  type    = "AAAA"
  content = "100::"
  proxied = true
  ttl     = 1
}

resource "cloudflare_ruleset" "redirects" {
  zone_id = var.zone_id
  name    = "default"
  kind    = "zone"
  phase   = "http_request_dynamic_redirect"

  rules = [{
    ref         = "www_to_root"
    description = "Redirect https://www.* to root domain"
    expression  = "(http.request.full_uri wildcard r\"https://www.*\")"
    action      = "redirect"
    enabled     = true

    action_parameters = {
      from_value = {
        status_code = 301
        target_url = {
          expression = "wildcard_replace(http.request.full_uri, r\"https://www.*\", r\"https://$${1}\")"
        }
        preserve_query_string = true
      }
    }
  }]
}
