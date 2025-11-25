export interface Config {
  /**
   * Configuration for the PlatformX plugin
   */
  platformx?: {
    /**
     * PlatformX API key for tracking events
     * @visibility frontend
     */
    apiKey: string;
    /**
     * Email domain to append to usernames (e.g., "thrivemarket.com")
     * @visibility frontend
     */
    emailDomain?: string;
  };
}
