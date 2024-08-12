import { memo, useCallback, useState } from 'react';
import { Button } from '@mui/material';

import { NewBook } from '../model/types/NewBook';
import { AddNewBookModal } from './AddNewBookModal/AddNewBookModal';

interface AddNewBookProps {
  sendNewBookData: (data: NewBook) => void;
}

const AddNewBook = memo((props: AddNewBookProps) => {
  const { sendNewBookData } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button
        variant="contained"
        onClick={onOpenModal}
        sx={{
          flexShrink: 1,
        }}
        data-testid="AddNewBook.Button"
      >
        Добавить новую книгу
      </Button>
      <AddNewBookModal
        isOpen={isOpen}
        onClose={onCloseModal}
        onSuccess={sendNewBookData}
        // data-testid="AddNewBook.Modal"
      />
    </>
  );
});

export { AddNewBook };
