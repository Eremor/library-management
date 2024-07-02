import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { AppRouter } from './providers/router';

export function App() {
  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <AppRouter />
    </Suspense>
  );
}
