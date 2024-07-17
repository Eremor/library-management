import { memo } from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';

const Loader = memo((props: CircularProgressProps) => (
  <CircularProgress
    color="secondary"
    {...props}
  />
));

export { Loader };
