import { ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@emotion/react';
import { theme } from '../config/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children } : ThemeProviderProps) {
  return (
    <MUIThemeProvider theme={theme}>
      {children}
    </MUIThemeProvider>
  );
}

export { ThemeProvider };
