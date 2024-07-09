import { memo } from 'react';

import { Page } from 'widgets/Page';

import { BooksTable } from './BooksTable/BooksTable';

const BooksPage = memo(() => (
  <Page>
    <BooksTable />
  </Page>
));

export default BooksPage;
