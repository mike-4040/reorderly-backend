import { Title, Text, Container } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/welcome')({
  component: Welcome,
});

function Welcome() {
  return (
    <Container>
      <Title order={1}>Welcome to Reorderly</Title>
      <Text mt="md">Get started by connecting your first supplier.</Text>
    </Container>
  );
}
