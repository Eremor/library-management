import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';

import { getAuthData } from 'entities/User';
import { BookStatus } from 'entities/Book';

interface RentControllerProps {
  bookId: string;
  status: BookStatus;
  tenantId?: string;
}

const RentController = memo((props: RentControllerProps) => {
  const { bookId, tenantId, status } = props;
  const user = useSelector(getAuthData);

  let content;

  if (!user) {
    content = (
      <Typography variant="inherit">
        {`Авторизуйтесь, чтобы арендовать книгу ${bookId}`}
      </Typography>
    );
  } else if (status === BookStatus.AVAILABLE) {
    content = (
      <Button variant="outlined">
        Взять в аренду
      </Button>
    );
  } else {
    content = (
      <Button
        variant="contained"
        disabled={user.id !== tenantId}
      >
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
