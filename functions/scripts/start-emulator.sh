#!/bin/bash

# Start Firebase Emulators for local development

# Cleanup function to kill both processes
cleanup() {
  echo -e "\n\nShutting down..."
  kill $tsc_pid 2>/dev/null
  kill $emulator_pid 2>/dev/null
  exit
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Start TypeScript compiler in watch mode
npx tsc -w --preserveWatchOutput &
tsc_pid=$!

# Load environment variables using Doppler
doppler secrets download --project backend --config dev --format env --no-file > .env

# Start Firebase emulators with environment variables in .env
firebase emulators:start --only functions &
emulator_pid=$!

# Wait for both processes
wait
