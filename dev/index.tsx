import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import platformxPlugin from '../src/plugin';
import { PlatformXTracker } from '../src/components';

createDevApp()
  .registerPlugin(platformxPlugin)
  .addPage({
    element: (
      <div style={{ padding: '2rem' }}>
        <PlatformXTracker />
        <h1>PlatformX Plugin Dev</h1>
        <p>The tracker is running. Check your browser console for tracking events.</p>
        <p>Navigate between pages to see page.visit events being tracked.</p>
      </div>
    ),
    title: 'PlatformX Tracker',
    path: '/platformx',
  })
  .render();
