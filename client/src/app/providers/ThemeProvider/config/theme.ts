import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#833D88',
      light: '#9b639f',
      dark: '#5b2a5f',
    },
    secondary: {
      main: '#46316D',
      light: '#6b5a8a',
      dark: '#31224c',
    },
    background: {
      default: '#FAF4FB',
    },
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: '5%',
        },
        primary: ({ theme }) => ({
          display: 'flex',
          flexShrink: 0,
          maxWidth: '210px',
          flexGrow: 1,
          fontSize: '1.5rem',
          fontWeight: 700,
          color: `${theme.palette.primary.main}`,
        }),
        secondary: {
          fontSize: '1.2rem',
          fontWeight: 500,
        },
      },
    },
  },
});
