import { Title, Text, Container } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <Container>
      <Title order={1}>Home</Title>
      <Text mt="md">Welcome to the home page</Text>
    </Container>
  );
}
