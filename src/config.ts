import { Config } from '@backstage/config';

export interface PlatformXConfig {
  apiKey: string;
}

export function readPlatformXConfig(config: Config): PlatformXConfig {
  const apiKey = config.getString('platformx.apiKey');

  if (!apiKey) {
    throw new Error('PlatformX API key is required. Please configure platformx.apiKey in app-config.yaml');
  }

  return { apiKey };
}
