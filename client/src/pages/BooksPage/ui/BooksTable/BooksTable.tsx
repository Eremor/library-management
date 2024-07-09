import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';

import { DynamicModuleLoader, ReducersList } from 'shared/lib/components';
import { useAppDispatch } from 'shared/lib/hooks';

import { booksPageReducer } from '../../model/slice/booksPageSlice';
import { fetchAllBooks } from '../../model/services/fetchAllBooks/fetchAllBooks';
import { getBooksPageData, getBooksPageError } from '../../model/selectors/booksPageSelector';

const reducers: ReducersList = {
  booksPage: booksPageReducer,
};

const BooksTable = memo(() => {
  const dispatch = useAppDispatch();
  const books = useSelector(getBooksPageData);
  // const isLoading = useSelector(getBooksPageIsLoading);
  const error = useSelector(getBooksPageError);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, []);

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount={false}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Название книги</TableCell>
              <TableCell align="right">Автор</TableCell>
              <TableCell align="right">Год публикации</TableCell>
              <TableCell align="right">Жанры</TableCell>
              <TableCell align="right">Статус аренды</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell>{error}</TableCell>
              </TableRow>
            )}
            {books?.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  {book.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DynamicModuleLoader>
  );
});

export { BooksTable };
