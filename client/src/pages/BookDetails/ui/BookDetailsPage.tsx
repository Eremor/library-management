import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import { Page } from 'widgets/Page';

import { EditableBook } from 'features/EditableBook';

import { bookReducer } from 'entities/Book';
import { loanReducer } from 'entities/Loan';
import { getAuthData, UserRole } from 'entities/User';

import { DynamicModuleLoader, ReducersList } from 'shared/lib/components';

import { BookDetailsCard } from './BookDetailsCard/BookDetailsCard';

const reducers: ReducersList = {
  book: bookReducer,
  loan: loanReducer,
};

const BookDetailsPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector(getAuthData);

  if (!id) {
    return null;
  }

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount
    >
      <Page>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            maxWidth: '700px',
          }}
          maxWidth={false}
        >
          {user && (user.role === UserRole.ADMIN) && (
            <EditableBook />
          )}
          <BookDetailsCard
            bookId={id}
          />
        </Container>
      </Page>
    </DynamicModuleLoader>
  );
});

export default BookDetailsPage;
