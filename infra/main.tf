terraform {
  required_version = "1.16.3"

  cloud {
    organization = "ctrl-shift-believe"
    workspaces {
      name = "mbinjamil-dev"
    }
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }
}

provider "cloudflare" {
  # API token will be read from CLOUDFLARE_API_TOKEN automatically
}