import { memo } from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';

import { Book } from 'entities/Book';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';

import { RoutePath } from 'shared/const';

interface BooksTableRowProps {
  book: Book;
}

const BooksTableRow = memo((props: BooksTableRowProps) => {
  const { book } = props;

  return (
    <TableRow
      key={book.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        sx={{
          fontWeight: 600,
        }}
      >
        <AppLink
          to={`${RoutePath.book_details}${book.id}`}
          theme={AppLinkTheme.PRIMARY}
          style={{
            width: '100%',
            display: 'block',
          }}
        >
          {book.title}
        </AppLink>
      </TableCell>
      <TableCell align="right">
        {book.author}
      </TableCell>
      <TableCell align="right">
        {book.publicYear}
      </TableCell>
      <TableCell align="right">
        {book.genres.join(', ')}
      </TableCell>
      <TableCell align="right">
        {
          book.status === 'AVAILABLE'
            ? (
              <Typography
                variant="inherit"
                color="green"
              >
                Свободна
              </Typography>
            )
            : (
              <Typography
                variant="inherit"
                color="red"
              >
                Занята
              </Typography>
            )
        }
      </TableCell>
    </TableRow>
  );
});

export { BooksTableRow };
