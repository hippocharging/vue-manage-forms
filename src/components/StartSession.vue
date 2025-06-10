<script setup lang="ts">
import axios from 'axios';
import Button from './ui/button/Button.vue';

const onClick = async () => {
  // Logic to start a session
  console.log('Session started');

  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  await axios.get('http://localhost:8081/sanctum/csrf-cookie');

  await axios.get('http://localhost:8081/magic-login?' + new URLSearchParams({ 'email': 'test@example.com' }));

  const response = await axios.get('http://localhost:8081/api/user');
  console.log('User data:', response.data);
};

</script>

<template>
  <Button @click="onClick">
    Start Session
  </Button>
</template>
