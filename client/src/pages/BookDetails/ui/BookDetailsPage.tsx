import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from 'widgets/Page';

import { bookReducer } from 'entities/Book';
import { loanReducer } from 'entities/Loan';

import { DynamicModuleLoader, ReducersList } from 'shared/lib/components';
import { Container } from '@mui/material';
import { BookDetailsCard } from './BookDetailsCard/BookDetailsCard';

const reducers: ReducersList = {
  book: bookReducer,
  loan: loanReducer,
};

const BookDetailsPage = memo(() => {
  const { id } = useParams<{ id: string }>();

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount
    >
      <Page>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <BookDetailsCard
            bookId={id}
          />
        </Container>
      </Page>
    </DynamicModuleLoader>
  );
});

export default BookDetailsPage;
