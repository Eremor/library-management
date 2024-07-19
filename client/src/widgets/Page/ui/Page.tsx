import { Container } from '@mui/material';
import { memo, ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
  className?: string;
}

const Page = memo(({ children, className }: PageProps) => (
  <Container
    className={className}
    maxWidth="xl"
    component="main"
    sx={{
      mt: { xs: 2, md: 4 },
    }}
  >
    {children}
  </Container>
));

export { Page };
