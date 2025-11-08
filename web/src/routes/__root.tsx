import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AppShell, Tabs } from '@mantine/core';
import { useNavigate, useRouterState } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <AppShell header={{ height: 60 }} padding="md" withBorder={false}>
      <AppShell.Header>
        <Tabs value={currentPath} onChange={(value) => value && navigate({ to: value })}>
          <Tabs.List>
            <Tabs.Tab value="/">Home</Tabs.Tab>
            <Tabs.Tab value="/suppliers">Suppliers</Tabs.Tab>
            <Tabs.Tab value="/settings">Settings</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <TanStackRouterDevtools />
    </AppShell>
  );
}
