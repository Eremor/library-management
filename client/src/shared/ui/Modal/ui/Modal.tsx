import { memo } from 'react';
import {
  Box,
  Modal as MuiModal,
  ModalProps as MuiModelProps,
  Typography,
  Backdrop,
} from '@mui/material';

interface ModalProps extends MuiModelProps {
  modalTitle: string;
}

const Modal = memo((props: ModalProps) => {
  const {
    children,
    modalTitle,
    ...otherProps
  } = props;
  return (
    <MuiModal
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      {...otherProps}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography
          variant="h3"
          mb={3}
          fontSize={{
            xs: '1.5rem',
            md: '2.5rem',
          }}
          textAlign="center"
        >
          {modalTitle}
        </Typography>
        {children}
      </Box>
    </MuiModal>
  );
});

export { Modal };
