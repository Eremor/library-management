import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar, Button, Container, Stack, Toolbar,
} from '@mui/material';

import { getAuthData } from 'entities/User';

import { HideOnScroll } from 'shared/ui/HideOnScroll';
import { Logo } from 'shared/ui/Logo';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/const';

import { AvatarButton } from 'features/AvatarButton';
import { LoginModal } from 'features/LoginUser';

const Navbar = memo(() => {
  const authData = useSelector(getAuthData);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const handleOpenLoginModal = useCallback(() => {
    setIsOpenLoginModal(true);
  }, []);

  const handleCloseLoginModal = useCallback(() => {
    setIsOpenLoginModal(false);
  }, []);

  const authControllers = (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleOpenLoginModal}
      >
        Войти
      </Button>
      <LoginModal
        isOpen={isOpenLoginModal}
        onClose={handleCloseLoginModal}
      />
    </>
  );

  return (
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
                {
                  authData
                    ? <AvatarButton />
                    : authControllers
                }
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
});

export { Navbar };
