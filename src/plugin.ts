import { createElement } from 'react';
import {
  createFrontendPlugin,
  ApiBlueprint,
  AppRootElementBlueprint,
  configApiRef,
  identityApiRef,
  createApiFactory,
} from '@backstage/frontend-plugin-api';
import { platformXApiRef, PlatformXClient } from './api';
import { PlatformXTracker } from './components';

export default createFrontendPlugin({
  id: 'platformx',
  extensions: [
    ApiBlueprint.make({
      name: 'platformx',
      params: {
        factory: createApiFactory({
          api: platformXApiRef,
          deps: {
            configApi: configApiRef,
            identityApi: identityApiRef,
          },
          factory: ({ configApi, identityApi }) => {
            return new PlatformXClient(configApi, identityApi);
          },
        }),
      },
    }),
    AppRootElementBlueprint.make({
      name: 'tracker',
      params: {
        element: () => {
          return createElement(PlatformXTracker);
        },
      },
    }),
  ],
});
