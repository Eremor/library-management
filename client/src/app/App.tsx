import { Suspense } from 'react';
import { CircularProgress, CssBaseline } from '@mui/material';
import { Navbar } from 'widgets/Navbar';
import { AppRouter } from './providers/router';

export function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <AppRouter />
      </Suspense>
    </>
  );
}
