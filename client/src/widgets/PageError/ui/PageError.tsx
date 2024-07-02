import { Button, Container, Typography } from '@mui/material';

function PageError() {
  const reloadPage = () => {
    location.reload();
  };
  return (
    <Container maxWidth={false}>
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
