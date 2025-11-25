import { Config } from '@backstage/config';

export interface PlatformXConfig {
  apiKey?: string;
  emailDomain?: string;
}

export function readPlatformXConfig(config: Config): PlatformXConfig {
  const apiKey = config.getOptionalString('platformx.apiKey')
    || config.getOptionalString('plugins.platformx.apiKey')
    || config.getOptionalString('app.plugins.platformx.apiKey')
    || config.getOptionalString('app.platformx.apiKey');

  const emailDomain = config.getOptionalString('platformx.emailDomain')
    || config.getOptionalString('plugins.platformx.emailDomain')
    || config.getOptionalString('app.plugins.platformx.emailDomain')
    || config.getOptionalString('app.platformx.emailDomain');

  if (!apiKey) {
    console.warn('[PlatformX] No API key configured. Events will not be tracked. Please configure platformx.apiKey in your app configuration.');
  }

  return { apiKey, emailDomain };
}
