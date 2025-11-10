/**
 * Signup page with email/password registration
 */

import { Alert, Button, Container, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, FormEvent } from 'react';

import { useAuth } from '../contexts/useAuth';

export const Route = createFileRoute('/signup')({
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    void (async () => {
      try {
        await signUp(email, password);
        await navigate({ to: '/welcome' });
      } catch (err) {
        if (err instanceof Error) {
          // Extract Firebase error message
          const cause = err.cause as { code?: string } | undefined;
          const errorCode = cause?.code ?? 'unknown';

          switch (errorCode) {
            case 'auth/email-already-in-use':
              setError('An account with this email already exists');
              break;
            case 'auth/invalid-email':
              setError('Invalid email address');
              break;
            case 'auth/operation-not-allowed':
              setError('Email/password accounts are not enabled');
              break;
            case 'auth/weak-password':
              setError('Password is too weak');
              break;
            default:
              setError('Failed to create account. Please try again');
          }
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <Container size="xs" mt="xl">
      <Title order={1} mb="lg">
        Create Account
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          {error && (
            <Alert color="red" title="Error">
              {error}
            </Alert>
          )}

          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            autoComplete="email"
          />

          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            autoComplete="new-password"
            description="Must be at least 6 characters"
          />

          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            required
            autoComplete="new-password"
          />

          <Button type="submit" loading={loading}>
            Create Account
          </Button>

          <Button component={Link} to="/login" variant="subtle">
            Already have an account? Sign in
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
