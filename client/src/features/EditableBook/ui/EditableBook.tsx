import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

import { getBookData, updateBook, UpdateBookData } from 'entities/Book';

import { useAppDispatch } from 'shared/lib/hooks';

import { EditableBookModal } from './EditableBookModal/EditableBookModal';

const EditableBook = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const book = useSelector(getBookData);

  const onOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onUpdateBook = useCallback((data: UpdateBookData) => {
    if (book) {
      dispatch(updateBook({
        bookId: book.id,
        dto: data,
      }));
    }
  }, [dispatch, book]);

  if (!book) {
    return null;
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={onOpenModal}
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        Редактировать книгу
      </Button>
      <EditableBookModal
        isOpen={isOpen}
        onClose={onCloseModal}
        onSuccess={onUpdateBook}
        book={book}
      />
    </>
  );
});

export { EditableBook };
