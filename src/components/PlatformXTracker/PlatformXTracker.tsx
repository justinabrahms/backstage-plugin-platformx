import { useEffect } from 'react';
import { useApi } from '@backstage/frontend-plugin-api';
import { platformXApiRef } from '../../api';
import useLocation from 'react-use/lib/useLocation';

export const PlatformXTracker = () => {
  console.info('[PlatformX] Tracker component rendering');
  const platformXApi = useApi(platformXApiRef);
  const location = useLocation();

  useEffect(() => {
    console.info('[PlatformX] Tracking page visit:', location.pathname);
    const trackPageVisit = async () => {
      await platformXApi.trackEvent({
        name: 'page.visit',
        metadata: {
          page: window.location.href,
          referrer: document.referrer,
          pathname: location.pathname,
        },
      });
    };

    trackPageVisit();
  }, [location.pathname, platformXApi]);

  return null;
};
