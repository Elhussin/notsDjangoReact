import { render, screen, waitFor } from '@testing-library/react';
import { UserProvider, useUser } from '../components/UserContext';

test('renders children and provides user context', async () => {
  const TestComponent = () => {
    const { user } = useUser();
    return <div>{user ? user.username : 'Loading...'}</div>;
  };

  render(
    <UserProvider>
      <TestComponent />
    </UserProvider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('username')).toBeInTheDocument());
});