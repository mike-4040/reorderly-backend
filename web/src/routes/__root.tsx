import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Link } from '@tanstack/react-router';
import './root-layout.css';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="root-layout">
      <nav className="top-nav">
        <Link to="/" className="nav-link" activeProps={{ className: 'active' }}>
          Home
        </Link>
        <Link to="/suppliers" className="nav-link" activeProps={{ className: 'active' }}>
          Suppliers
        </Link>
        <Link to="/settings" className="nav-link" activeProps={{ className: 'active' }}>
          Settings
        </Link>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
