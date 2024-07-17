import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Card, CardActions, CardContent, List, ListItem, ListItemText,
} from '@mui/material';

import { RentController } from 'features/RentController';

import { fetchBookById, getBookData } from 'entities/Book';
import { fetchLoanByBookId, getLoanData } from 'entities/Loan';

import { useAppDispatch } from 'shared/lib/hooks';

interface BookDetailsCardProps {
  bookId: string;
}

function BookDetailsCard(props: BookDetailsCardProps) {
  const { bookId } = props;
  const dispatch = useAppDispatch();
  const book = useSelector(getBookData);
  const loan = useSelector(getLoanData);

  useEffect(() => {
    dispatch(fetchBookById(bookId));
    dispatch(fetchLoanByBookId(bookId));
  }, [bookId, dispatch]);

  if (!book) {
    return null;
  }

  return (
    <Card sx={{
      maxWidth: 700,
      flexGrow: 1,
    }}
    >
      <CardContent>
        <List>
          <ListItem>
            <ListItemText
              primary="Название книги:"
              secondary={book.title}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Автор:"
              secondary={book.author}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Год публикации:"
              secondary={book.publicYear}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Жанры:"
              secondary={book.genres.join(', ')}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions
        sx={{
          p: '0px 20px 20px 0px',
          justifyContent: 'flex-end',
        }}
      >
        <RentController
          bookId={book.id}
          status={book.status}
          tenantId={loan?.userId}
        />
      </CardActions>
    </Card>
  );
}

export { BookDetailsCard };
