import { createFileRoute } from '@tanstack/react-router';
import { Title, Text, Container } from '@mantine/core';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  return (
    <Container>
      <Title order={1}>Settings</Title>
      <Text mt="md">Configure your settings</Text>
    </Container>
  );
}
