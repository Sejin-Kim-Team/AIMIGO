<script setup lang="ts">
import Avatar02 from 'assets/images/avatar-02.png'
import Avatar01 from 'assets/images/avatar-01.png'
import KButton from '~/components/atoms/KButton.vue'
import { useElementHover } from '#imports'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/chat',
  },
  layout: 'sessionless',
})

const btnRef = ref<HTMLElement>()
const isHovered = useElementHover(btnRef)
const src = computed(() => isHovered.value ? Avatar02 : Avatar01)

const { signIn } = useAuth()
</script>

<template>
  <div class="mx-auto mt-8 card max-w-lg rounded-box shadow-lg bg-base-200">
    <figure><img :src="src" alt="Avatar" class="max-w-[240px] mt-8 mx-auto"></figure>
    <div class="card-body">
      <div class="card-actions">
        <h2 class="text-center w-full text-lg">
          당신의 친구 <span class="text-accent">AIMIGO!</span> 와 함께 해 보세요 :)
        </h2>
        <KButton
          ref="btnRef"
          class="w-full btn-primary"
          @click="signIn('google', {
            callbackUrl: '/chat',
          })"
        >
          <Icon name="logos:google-icon" size="28" />
          구글 아이디로 로그인
        </KButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
