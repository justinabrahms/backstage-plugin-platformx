import { Config } from '@backstage/config';

export interface PlatformXConfig {
  apiKey?: string;
}

export function readPlatformXConfig(config: Config): PlatformXConfig {
  const apiKey = config.getOptionalString('platformx.apiKey');

  if (!apiKey) {
    console.warn('[PlatformX] No API key configured. Events will not be tracked. Please configure platformx.apiKey in your app configuration.');
  }

  return { apiKey };
}
