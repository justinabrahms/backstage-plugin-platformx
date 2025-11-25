import {
  createApiRef,
  ConfigApi,
  IdentityApi,
} from '@backstage/frontend-plugin-api';
import { readPlatformXConfig } from './config';

export const platformXApiRef = createApiRef<PlatformXApi>({
  id: 'plugin.platformx.service',
});

export interface TrackEventOptions {
  name: string;
  metadata?: Record<string, any>;
}

export interface PlatformXApi {
  trackEvent(options: TrackEventOptions): Promise<void>;
}

export class PlatformXClient implements PlatformXApi {
  private readonly apiKey?: string;
  private readonly emailDomain?: string;
  private readonly apiUrl = 'https://api.getdx.com/events.track';

  constructor(
    configApi: ConfigApi,
    private readonly identityApi: IdentityApi,
  ) {
    const config = readPlatformXConfig(configApi);
    this.apiKey = config.apiKey;
    this.emailDomain = config.emailDomain;
  }

  async trackEvent(options: TrackEventOptions): Promise<void> {
    try {
      if (!this.apiKey) {
        return;
      }

      const identity = await this.identityApi.getBackstageIdentity();
      const username = identity.userEntityRef.split(':')[1].split('/')[1];

      // Construct email: append domain if configured, otherwise use username as-is
      const email = this.emailDomain ? `${username}@${this.emailDomain}` : username;

      const data = {
        name: options.name,
        email,
        timestamp: Math.floor(Date.now() / 1000).toString(),
        metadata: options.metadata || {},
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('[PlatformX] API error:', response.status, text);
      }
    } catch (error) {
      // Silently fail to not disrupt user experience
      console.error('[PlatformX] Failed to track event:', error);
    }
  }
}
