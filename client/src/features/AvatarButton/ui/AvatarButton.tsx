import {
  memo, MouseEvent, useCallback, useState,
} from 'react';
import {
  IconButton, Menu, MenuItem, SvgIcon,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { getAuthData, userActions } from 'entities/User';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/const';
import { useAppDispatch } from 'shared/lib/hooks';

import UserIcon from 'shared/assets/user_circle_icon.svg';

const AvatarButton = memo(() => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const authData = useSelector(getAuthData);

  const handleOpenMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorElement(null);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
    setAnchorElement(null);
  }, [dispatch]);

  return (
    <>
      <IconButton
        onClick={handleOpenMenu}
        data-testid="AvatarButton.IconBtn"
      >
        <SvgIcon
          sx={{
            fill: '#fff',
            stroke: '#fff',
          }}
          fontSize="large"
        >
          <UserIcon />
        </SvgIcon>
      </IconButton>
      <Menu
        sx={{
          mt: '45px',
        }}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElement)}
        onClose={handleCloseMenu}
        data-testid="AvatarButton.Menu"
      >
        <MenuItem
          onClick={handleCloseMenu}
          data-testid="AvatarButton.ProfileBtn"
        >
          <AppLink
            to={`${RoutePath.profile}${authData?.id}`}
            theme={AppLinkTheme.CLEAN}
          >
            Профиль
          </AppLink>
        </MenuItem>
        <MenuItem
          onClick={onLogout}
          data-testid="AvatarButton.LogoutBtn"
        >
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
});

export { AvatarButton };
