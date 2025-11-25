import { Config } from '@backstage/config';

export interface PlatformXConfig {
  apiKey?: string;
  emailDomain?: string;
}

export function readPlatformXConfig(config: Config): PlatformXConfig {
  console.info('[PlatformX] Reading configuration...');

  // Debug: Try multiple config paths that Portal might use
  const possiblePaths = [
    'platformx.apiKey',
    'plugins.platformx.apiKey',
    'app.plugins.platformx.apiKey',
    'frontend.plugins.platformx.apiKey',
  ];

  for (const path of possiblePaths) {
    const value = config.getOptionalString(path);
    if (value) {
      console.info(`[PlatformX] Found API key at config path: ${path}`);
    }
  }

  // Debug: log all config keys at platformx level
  try {
    const platformxConfig = config.getOptionalConfig('platformx');
    if (platformxConfig) {
      console.info('[PlatformX] Found platformx config section');
      const keys = platformxConfig.keys();
      console.info('[PlatformX] Available config keys:', Array.from(keys));
    } else {
      console.warn('[PlatformX] No platformx config section found');
    }
  } catch (err) {
    console.warn('[PlatformX] Error reading platformx config section:', err);
  }

  // Try reading from various possible paths
  const apiKey = config.getOptionalString('platformx.apiKey')
    || config.getOptionalString('plugins.platformx.apiKey')
    || config.getOptionalString('app.plugins.platformx.apiKey')
    || config.getOptionalString('app.platformx.apiKey');

  const emailDomain = config.getOptionalString('platformx.emailDomain')
    || config.getOptionalString('plugins.platformx.emailDomain')
    || config.getOptionalString('app.plugins.platformx.emailDomain')
    || config.getOptionalString('app.platformx.emailDomain');

  console.info('[PlatformX] API key present:', !!apiKey, '(length:', apiKey?.length ?? 0, ')');
  console.info('[PlatformX] Email domain:', emailDomain || '(none - will use username as-is)');

  if (!apiKey) {
    console.warn('[PlatformX] No API key configured. Events will not be tracked. Please configure platformx.apiKey in your app configuration.');
  } else {
    console.info('[PlatformX] API key configured successfully');
  }

  return { apiKey, emailDomain };
}
