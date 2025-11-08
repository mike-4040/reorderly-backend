import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/suppliers')({
  component: Suppliers,
});

function Suppliers() {
  return (
    <div>
      <h1>Suppliers</h1>
      <p>Manage your suppliers</p>
    </div>
  );
}
