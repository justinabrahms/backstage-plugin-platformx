export interface Config {
  /**
   * Configuration for the PlatformX plugin
   */
  platformx?: {
    /**
     * PlatformX API key for tracking events
     * @visibility secret
     */
    apiKey: string;
  };
}
