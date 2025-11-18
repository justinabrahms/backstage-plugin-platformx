import { createFrontendPlugin } from '@backstage/frontend-plugin-api';
import { ApiBlueprint } from '@backstage/frontend-plugin-api';
import {
  configApiRef,
  identityApiRef,
} from '@backstage/frontend-plugin-api';
import { platformXApiRef, PlatformXClient } from './api';

export default createFrontendPlugin({
  id: 'platformx',
  extensions: [
    ApiBlueprint.make({
      name: 'platformx',
      params: {
        factory: (configApi, identityApi) =>
          new PlatformXClient(configApi, identityApi),
        deps: {
          configApi: configApiRef,
          identityApi: identityApiRef,
        },
        api: platformXApiRef,
      },
    }),
  ],
});
