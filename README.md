# Backstage PlatformX Plugin

A Backstage plugin that tracks user page visits and events using
[PlatformX by DX](https://getdx.com/) .

This plugin uses the new Backstage frontend system.

## Installation

1. Install the plugin in your Backstage app:

```bash
yarn workspace app add @justinabrahms/backstage-plugin-platformx
```

1. Configure the PlatformX API key in your `app-config.yaml`:

```yaml
platformx:
  apiKey: ${PLATFORMX_API_KEY}
```

1. Add the plugin to your `packages/app/src/index.tsx`:

```tsx
import platformxPlugin from '@justinabrahms/backstage-plugin-platformx';

export default createApp({
  features: [
    // ... other plugins
    platformxPlugin,
  ],
});
```

The plugin automatically includes a tracker component that will be rendered at
the app root level. No additional configuration is needed!

## Usage

The plugin automatically tracks page visits when users navigate through your
Backstage instance. Each page visit sends:

- Event name: `page.visit`
- User email (from Backstage identity)
- Timestamp
- Metadata:
  - `page`: Full URL
  - `referrer`: Previous page
  - `pathname`: Current path

### Custom Event Tracking

You can also track custom events using the API:

```text

```

```tsx
import { useApi } from '@backstage/frontend-plugin-api';
import { platformXApiRef } from '@justinabrahms/backstage-plugin-platformx';

function MyComponent() {
  const platformXApi = useApi(platformXApiRef);

  const handleAction = async () => {
    await platformXApi.trackEvent({
      name: 'button.clicked',
      metadata: {
        button: 'create-component',
        page: window.location.pathname,
      },
    });
  };

  return <button onClick={handleAction}>Create Component</button>;
}
```

## Configuration

### Required Configuration

- `platformx.apiKey`: Your PlatformX API key (obtain from your PlatformX project settings)

### Environment Variables

Set the API key as an environment variable:

```bash
export PLATFORMX_API_KEY=your_api_key_here
```

## Features

- Automatic page visit tracking
- User identification via Backstage identity
- Custom event tracking API
- Silent failure (won't disrupt user experience if tracking fails)
- TypeScript support

## License

Apache-2.0
