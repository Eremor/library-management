import { memo } from 'react';
import { Typography } from '@mui/material';

const Logo = memo(() => (
  <Typography
    variant="h2"
    noWrap
    sx={{
      fontFamily: 'monospace',
      fontSize: '2rem',
      fontWeight: '700',
      color: 'inherit',
      textDecoration: 'none',
    }}
  >
    Lib-M
  </Typography>
));

export { Logo };
