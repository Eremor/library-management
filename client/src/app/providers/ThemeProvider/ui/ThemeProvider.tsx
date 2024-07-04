import { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@emotion/react';
import { theme } from '../config/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children } : ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
}

export { ThemeProvider };
