<script setup lang="ts">
// import LogRocket from 'logrocket'
//
// LogRocket.init('gpgrhj/aimigo')

const { firebaseApp } = useFirebase()
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <NuxtSnackbar />
  </NuxtLayout>
</template>
