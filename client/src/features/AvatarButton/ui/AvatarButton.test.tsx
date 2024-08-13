import userEvent from "@testing-library/user-event";
import { screen } from '@testing-library/react';

import { User, UserRole } from "entities/User";
import { componentRenter } from "shared/tests";

import { AvatarButton } from './AvatarButton';

describe('AvatarButton', () => {
  const authData: User = {
    id: '123',
    userName: 'Test',
    email: 'test@mail.ru',
    password: '123',
    role: UserRole.USER
  }

  test('should display menu', async () => {
    componentRenter(<AvatarButton />);

    await userEvent.click(screen.getByTestId('AvatarButton.IconBtn'));
    expect(screen.getByTestId('AvatarButton.Menu')).toBeInTheDocument();
  });
  test('should hidden menu after click profile button', async () => {
    componentRenter(
      <AvatarButton />,
      {
        initialState: {
          user: {
            authData
          }
        }
      }
    );

    await userEvent.click(screen.getByTestId('AvatarButton.IconBtn'));
    await userEvent.click(screen.getByTestId('AvatarButton.ProfileBtn'));

    expect(screen.getByTestId('AvatarButton.Menu')).toHaveStyle('visibility: hidden');
  });
})