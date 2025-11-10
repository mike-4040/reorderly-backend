import { Title, Text, Container } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/suppliers')({
  component: Suppliers,
});

function Suppliers() {
  return (
    <Container>
      <Title order={1}>Suppliers</Title>
      <Text mt="md">Manage your suppliers</Text>
    </Container>
  );
}
