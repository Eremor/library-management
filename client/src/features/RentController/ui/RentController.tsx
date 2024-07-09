import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';

import { getAuthData } from 'entities/User';
import { BookStatus } from 'entities/Book';

interface RentControllerProps {
  bookId: string;
  status: BookStatus;
}

const RentController = memo((props: RentControllerProps) => {
  const { bookId, status } = props;
  const user = useSelector(getAuthData);

  let content;

  if (!user) {
    content = (
      <Typography variant="inherit">
        {`Авторизуйтесь, чтобы арендовать книгу ${bookId}`}
      </Typography>
    );
  } else if (status === 'AVAILABLE') {
    content = (
      <Button variant="outlined">
        Взять в аренду
      </Button>
    );
  } else {
    content = (
      <Button variant="contained">
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
