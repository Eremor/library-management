import { memo } from 'react';
import {
  AppBar, Button, Container, Stack, Toolbar,
} from '@mui/material';

import { HideOnScroll } from 'shared/ui/HideOnScroll';
import { Logo } from 'shared/ui/Logo';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/const';

const Navbar = memo(() => (
  <>
    <HideOnScroll>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AppLink
              to={RoutePath.main}
              theme={AppLinkTheme.CLEAN}
            >
              <Logo />
            </AppLink>
            <Stack
              direction="row"
              spacing={{ xs: 1, md: 4 }}
              ml={{ xs: 3, md: 10 }}
            >
              <AppLink to={RoutePath.books}>
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
