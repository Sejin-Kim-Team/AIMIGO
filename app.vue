<script setup lang="ts">
import LogRocket from 'logrocket'

LogRocket.init('gpgrhj/aimigo')
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <NuxtSnackbar />
  </NuxtLayout>
</template>
