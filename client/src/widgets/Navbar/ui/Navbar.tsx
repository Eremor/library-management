import { memo } from 'react';
import {
  AppBar, Button, Container, Stack, Toolbar,
} from '@mui/material';

import { HideOnScroll } from 'shared/ui/HideOnScroll';
import { Logo } from 'shared/ui/Logo';
import { AppLink } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/const';

const Navbar = memo(() => (
  <>
    <HideOnScroll>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', width: '100%' }}>
            <Logo />
            <Stack
              direction="row"
              spacing={4}
              ml={10}
            >
              <AppLink to={RoutePath.main}>
                Книги
              </AppLink>
              <AppLink to={RoutePath.loans}>
                Журнал выдачи книг
              </AppLink>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                ml: 'auto',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
              >
                Войти
              </Button>
              <Button
                variant="text"
                color="inherit"
                size="small"
              >
                Зарегистрироваться
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
    <Toolbar />
  </>
));

export { Navbar };
