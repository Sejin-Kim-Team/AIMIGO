<script setup lang="ts">
import { definePageMeta, useAuth } from '#imports'
import KButton from '~/components/atoms/KButton.vue'

const { signIn, token, data, status, lastRefreshedAt } = useAuth()

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})
</script>

<template>
  <div class="flex justify-center">
    <div class="p-4 rounded-lg shadow-md w-[400px] h-[600px]">
      <div class="text-xl text-center">
        로그인/회원가입
      </div>
      <div class="flex flex-col justify-center h-full">
        <KButton class="btn-outline" @click="signIn('google', { callbackUrl: '/' })">
          <Icon name="logos:google-icon" size="28" />
          아이디로 로그인
        </KButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
