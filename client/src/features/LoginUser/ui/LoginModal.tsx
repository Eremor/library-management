import { memo } from 'react';
import { Box } from '@mui/material';
import { Modal } from 'shared/ui/Modal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = memo((props: LoginModalProps) => {
  const { isOpen, onClose } = props;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      modalTitle="Авторизация"
    >
      <Box>
        login form
      </Box>
    </Modal>
  );
});

export { LoginModal };
