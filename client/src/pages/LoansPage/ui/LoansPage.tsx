import { memo } from 'react';
import { Container } from '@mui/material';

import { Page } from 'widgets/Page';
import { LoansTable } from './LoansTable/LoansTable';

const LoansPage = memo(() => (
  <Page>
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <LoansTable />
    </Container>
  </Page>
));

export default LoansPage;
