import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';

import { App } from 'app/App';
import { theme } from 'app/providers/ThemeProvider';

const container = document.getElementById('root');

if (!container) {
  throw new Error('root not found');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
