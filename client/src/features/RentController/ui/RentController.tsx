import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';

import { getAuthData } from 'entities/User';
import { BookStatus } from 'entities/Book';
import {
  updateLoan,
  getLoanIsLoading,
  addLoan,
  getLoanError,
} from 'entities/Loan';

import { useAppDispatch } from 'shared/lib/hooks';
import { Loader } from 'shared/ui/Loader';

interface RentControllerProps {
  bookId: string;
  status: BookStatus;
  tenantId?: string;
}

const RentController = memo((props: RentControllerProps) => {
  const { bookId, tenantId, status } = props;
  const dispatch = useAppDispatch();
  const user = useSelector(getAuthData);
  const isLoadingLoan = useSelector(getLoanIsLoading);
  const error = useSelector(getLoanError);

  let content;

  const rentBook = useCallback(() => {
    if (user) {
      dispatch(addLoan({
        bookId,
        userId: user.id,
      }));
    }
  }, [bookId, user, dispatch]);

  const returnBook = useCallback(() => {
    if (user) {
      dispatch(updateLoan({
        bookId,
        userId: user.id,
      }));
    }
  }, [bookId, user, dispatch]);

  if (!user) {
    content = (
      <Typography variant="inherit">
        Авторизуйтесь, чтобы арендовать книгу
      </Typography>
    );
  } else if (status === BookStatus.AVAILABLE) {
    content = (
      <Button
        variant="outlined"
        onClick={rentBook}
        sx={{
          position: 'relative',
        }}
      >
        {isLoadingLoan && (
          <Loader
            sx={{
              position: 'absolute',
              top: '-1px',
              left: '-50%',
            }}
          />
        )}
        Взять в аренду
      </Button>
    );
  } else {
    content = (
      <Button
        variant="contained"
        disabled={user.id !== tenantId}
        onClick={returnBook}
        sx={{
          position: 'relative',
        }}
      >
        {isLoadingLoan && (
          <Loader
            sx={{
              position: 'absolute',
              top: '-1px',
              left: '-50%',
            }}
          />
        )}
        Сдать книгу
      </Button>
    );
  }

  return (
    <>
      {content}
      {error && (
        <Typography
          variant="subtitle1"
          color="red"
        >
          {error}
        </Typography>
      )}
    </>
  );
});

export { RentController };
