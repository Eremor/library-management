import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { DynamicModuleLoader, ReducersList } from 'shared/lib/components';
import { useAppDispatch } from 'shared/lib/hooks';

import { booksPageReducer } from '../../model/slice/booksPageSlice';
import { fetchAllBooks } from '../../model/services/fetchAllBooks/fetchAllBooks';
import {
  getBooksPageData,
  getBooksPageError,
  getBooksPageIsLoading,
} from '../../model/selectors/booksPageSelector';
import { BooksTableRow } from '../BooksTableRow/BooksTableRow';

const reducers: ReducersList = {
  booksPage: booksPageReducer,
};

const BooksTable = memo(() => {
  const dispatch = useAppDispatch();
  const books = useSelector(getBooksPageData);
  const isLoading = useSelector(getBooksPageIsLoading);
  const error = useSelector(getBooksPageError);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: { sm: '350px' },
                }}
              >
                Название книги
              </TableCell>
              <TableCell align="right">Автор</TableCell>
              <TableCell align="right">Год публикации</TableCell>
              <TableCell align="right">Жанры</TableCell>
              <TableCell align="right">Статус аренды</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book) => (
              <BooksTableRow book={book} key={book.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && (
        <Typography
          variant="subtitle1"
          color="red"
        >
          {error}
        </Typography>
      )}
      {isLoading && (
        <Stack
          gap={1}
          sx={{
            width: '100%',
          }}
        >
          <Skeleton
            variant="rectangular"
            height={60}
          />
          <Skeleton
            variant="rectangular"
            height={60}
          />
          <Skeleton
            variant="rectangular"
            height={60}
          />
        </Stack>
      )}
    </DynamicModuleLoader>
  );
});

export { BooksTable };
