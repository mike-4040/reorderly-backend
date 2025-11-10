import { AppShell, Button, Group, Menu, Tabs } from '@mantine/core';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AuthProvider } from '../contexts/AuthProvider';
import { useAuth } from '../contexts/useAuth';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}

function RootLayoutContent() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    void (async () => {
      try {
        await signOut();
        await navigate({ to: '/login' });
      } catch (error) {
        console.error('Sign out failed:', error);
      }
    })();
  };

  return (
    <AppShell header={{ height: 60 }} padding="md" withBorder={false}>
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md">
          <Tabs
            value={currentPath}
            onChange={(value) => {
              if (value) {
                void navigate({ to: value });
              }
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="/">Home</Tabs.Tab>
              <Tabs.Tab value="/suppliers">Suppliers</Tabs.Tab>
              <Tabs.Tab value="/settings">Settings</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Group gap="sm">
            {user ? (
              <Menu>
                <Menu.Target>
                  <Button variant="subtle">{user.email}</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={handleSignOut}>Sign Out</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <Button
                  variant="subtle"
                  onClick={() => {
                    void navigate({ to: '/login' });
                  }}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    void navigate({ to: '/signup' });
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <TanStackRouterDevtools />
    </AppShell>
  );
}
