import { screen, render } from '@testing-library/react';

import { Profile } from "../model/types/profile"
import { ProfileCard } from "./ProfileCard"

describe('entities/ProfileCard', () => {
  const testProfile: Profile = {
    id: '1234',
    userName: 'Tester',
    email: 'test@mail.ru'
  }

  test('should display skeleton loading items', () => {
    render(<ProfileCard isLoading={true} />);

    const profileCard = screen.getByTestId('ProfileCard.Card');
    expect(profileCard).toBeInTheDocument();
    const skeletons = screen.getAllByTestId('ProfileCard.Skeleton');
    expect(skeletons).toHaveLength(2);
    expect(skeletons[0]).toHaveClass('MuiSkeleton-root');
  });
  test('should display profile data', () => {
    render(<ProfileCard data={testProfile} />);
    
    const profileCard = screen.getByTestId('ProfileCard.Card');
    expect(profileCard).toBeInTheDocument();

    const userNameEl = screen.getByTestId('ProfileCard.UserName');
    expect(userNameEl).toBeInTheDocument()
    expect(userNameEl.children).toHaveLength(2);
    const [userTitle, userData] = userNameEl.children;
    expect(userTitle.textContent).toBe('Пользователь:');
    expect(userData.textContent).toBe(testProfile.userName);

    const userEmailEl = screen.getByTestId('ProfileCard.UserEmail');
    expect(userEmailEl).toBeInTheDocument();
    expect(userEmailEl.children).toHaveLength(2);
    const [emailTitle, emailData] = userEmailEl.children;
    expect(emailTitle.textContent).toBe('Почта:');
    expect(emailData.textContent).toBe(testProfile.email);
  });
  test('should display error', () => {
    render(<ProfileCard error='Test error' />);

    const profileCard = screen.getByTestId('ProfileCard.Card');
    expect(profileCard).toBeInTheDocument();

    const errorEl = screen.getByTestId('ProfileCard.Error');
    expect(errorEl).toBeInTheDocument();
    expect(errorEl.textContent).toBe('Test error');
  })
})