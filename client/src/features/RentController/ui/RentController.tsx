import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';

import { getAuthData } from 'entities/User';
import { BookStatus } from 'entities/Book';
import { updateLoan, getLoanIsLoading } from 'entities/Loan';

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
  const isLoadingReturned = useSelector(getLoanIsLoading);

  let content;

  const rentBook = useCallback(() => {

  }, []);

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
        {`Авторизуйтесь, чтобы арендовать книгу ${bookId}`}
      </Typography>
    );
  } else if (status === BookStatus.AVAILABLE) {
    content = (
      <Button
        variant="outlined"
        onClick={rentBook}
      >
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
        {isLoadingReturned && (
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
    </>
  );
});

export { RentController };
