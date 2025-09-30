import { Stack } from 'expo-router';
import React from 'react';

export default function SuperAdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create-user" />
      <Stack.Screen name="approval" />
      <Stack.Screen name="active" />
    </Stack>
  );
}
