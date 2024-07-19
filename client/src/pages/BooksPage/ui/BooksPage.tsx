import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';

import { Page } from 'widgets/Page';

import { AddNewBook, NewBook } from 'features/AddNewBook';

import { getAuthData } from 'entities/User';

import { useAppDispatch } from 'shared/lib/hooks';

import { BooksTable } from './BooksTable/BooksTable';
import { createNewBook } from '../model/services/createNewBook/createNewBook';

const BooksPage = memo(() => {
  const user = useSelector(getAuthData);
  const dispatch = useAppDispatch();

  const addNewBook = useCallback((newBook: NewBook) => {
    dispatch(createNewBook(newBook));
  }, [dispatch]);

  return (
    <Page>
      <Stack
        gap={4}
        direction="column"
        alignItems="flex-start"
      >
        {(user?.role === 'ADMIN') && (
          <AddNewBook
            sendNewBookData={addNewBook}
          />
        )}
        <BooksTable />
      </Stack>
    </Page>
  );
});

export default BooksPage;
