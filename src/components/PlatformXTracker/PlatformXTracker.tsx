import { useEffect } from 'react';
import { useApi } from '@backstage/frontend-plugin-api';
import { platformXApiRef } from '../../api';
import useLocation from 'react-use/lib/useLocation';

export const PlatformXTracker = () => {
  const platformXApi = useApi(platformXApiRef);
  const location = useLocation();

  useEffect(() => {
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
