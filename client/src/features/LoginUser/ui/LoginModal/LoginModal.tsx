import { memo } from 'react';
import { Box } from '@mui/material';
import { Modal } from 'shared/ui/Modal';
import LoginForm from '../LoginForm/LoginForm';

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
      <Box
        width='100%'
      >
        <LoginForm onSuccess={onClose} />
      </Box>
    </Modal>
  );
});

export { LoginModal };
