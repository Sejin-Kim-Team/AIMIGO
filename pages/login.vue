<script setup lang="ts">
import { definePageMeta, useAuth } from '#imports'

const { signIn, token, data, status, lastRefreshedAt } = useAuth()

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})
</script>

<template>
  <div>
    <button @click="signIn('google')">
      Google
    </button>
  </div>
</template>

<style scoped lang="scss">

</style>
