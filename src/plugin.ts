import React from 'react';
import {
  createFrontendPlugin,
  ApiBlueprint,
  AppRootElementBlueprint,
  configApiRef,
  identityApiRef,
} from '@backstage/frontend-plugin-api';
import { platformXApiRef, PlatformXClient } from './api';
import { PlatformXTracker } from './components';

export default createFrontendPlugin({
  id: 'platformx',
  extensions: [
    ApiBlueprint.make({
      name: 'platformx',
      params: defineParams =>
        defineParams({
          api: platformXApiRef,
          deps: {
            configApi: configApiRef,
            identityApi: identityApiRef,
          },
          factory: ({ configApi, identityApi }) =>
            new PlatformXClient(configApi, identityApi),
        }),
    }),
    AppRootElementBlueprint.make({
      name: 'tracker',
      params: {
        element: React.createElement(PlatformXTracker),
      },
    }),
  ],
});
