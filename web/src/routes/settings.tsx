import { createFileRoute } from '@tanstack/react-router';
import { Title, Text, Container, Button } from '@mantine/core';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  return (
    <Container>
      <Title order={1}>Settings</Title>
      <Text mt="md">Configure your settings</Text>
      <Button
        component="a"
        href="http://127.0.0.1:5001/reorderly-staging/us-central1/squareAuthorize?flow=login"
        mt="md"
      >
        Continue with Square
      </Button>
    </Container>
  );
}
