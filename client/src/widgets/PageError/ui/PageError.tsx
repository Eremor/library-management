import { Button, Container, Typography } from '@mui/material';

function PageError() {
  const reloadPage = () => {
    location.reload();
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography>
        Произошла непредвиденная ошибка
      </Typography>
      <Button
        variant="outlined"
        onClick={reloadPage}
      >
        Обновить страницу
      </Button>
    </Container>
  );
}

export { PageError };
