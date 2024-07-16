import {
  ChangeEvent, memo, useCallback, useEffect, useState,
} from 'react';
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
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { DynamicModuleLoader, ReducersList } from 'shared/lib/components';
import { useAppDispatch } from 'shared/lib/hooks';

import { loansPageReducer } from '../../model/slice/loansPageSlice';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from '../../model/const/const';
import {
  getLoansPageData,
  getLoansPageError,
  getLoansPageIsLoading,
} from '../../model/selectors/loansPageSelector';
import { fetchAllLoans } from '../../model/services/fetchAllLoans/fetchAllLoans';
import { LoansTableRow } from '../LoansTableRow/LoansTableRow';

const reducers: ReducersList = {
  loansPage: loansPageReducer,
};

const LoansTable = memo(() => {
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const dispatch = useAppDispatch();
  const loans = useSelector(getLoansPageData);
  const isLoading = useSelector(getLoansPageIsLoading);
  const error = useSelector(getLoansPageError);

  useEffect(() => {
    dispatch(fetchAllLoans());
  }, []);

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(DEFAULT_PAGE_NUMBER);
  }, []);

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount
    >
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 800 }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Название книги</TableCell>
                <TableCell>Имя пользователя</TableCell>
                <TableCell align="right">Дата аренды</TableCell>
                <TableCell align="right">Дата возврата</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((loanResponse) => (
                  <LoansTableRow
                    key={loanResponse.loan.id}
                    loanResponse={loanResponse}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {loans && (
          <TablePagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            component="div"
            count={loans.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Количество на странице:"
          />
        )}
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
            <Skeleton
              variant="rectangular"
              height={40}
            />
          </Stack>
        )}
      </Paper>
    </DynamicModuleLoader>
  );
});

export { LoansTable };
