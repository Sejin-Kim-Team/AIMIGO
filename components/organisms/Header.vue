<script setup lang="ts">
import Avatar01 from '~/assets/images/avatar-01.png'
import Avatar02 from '~/assets/images/avatar-02.png'
import { useElementHover } from '#imports'
import { HEART_CHARGING, HEART_FULL, HEART_ZERO } from '~/constants/icon.constants'
import { HEART_MAX } from '~/constants/heart.constants'
import { useAimigoStore } from '~/store/aimigo.store'

const { status, signOut } = useAuth()
const aimigoStore = useAimigoStore()
const heart = computed(() => aimigoStore.heart)
const user = computed(() => aimigoStore.user)

const iconRef = ref<HTMLElement>()
const iconIsHovered = useElementHover(iconRef)
const iconSrc = computed(() => iconIsHovered.value ? Avatar02 : Avatar01)

const computedHeart = computed(() => {
  if (heart.value === HEART_MAX)
    return HEART_FULL
  else if (heart.value === 0)
    return HEART_ZERO
  else return HEART_CHARGING
})

tryOnMounted(() => aimigoStore.fetchUser())
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost m-1">
            <img :src="iconSrc" alt="avatar" class="w-8 h-8">
          </label>
          <ul v-if="status === 'authenticated' && user" tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li class="p-4 text-lg">
              반가워요, {{ user.name }} 😚
            </li>

            <li @click="navigateTo('/mypage')">
              <a>마이페이지</a>
            </li>

            <li @click="navigateTo('/mypage/mbti-characters')">
              <a>AIMIGO! 설정하기</a>
            </li>

            <li @click="signOut({ callbackUrl: '/' })">
              <a>로그아웃</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="navbar-center">
        <NuxtLink ref="iconRef" class="link-btn " to="/">
          <span class="normal-case text-xl text-base-content">AIMIGO!</span>
        </NuxtLink>
      </div>
      <div class="navbar-end">
        <div class="btn btn-ghost">
          <Icon :name="computedHeart" size="28" /> {{ heart }}
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.link-btn {
  @apply btn btn-ghost normal-case;
}

.link-btn--square {
  @apply btn-square;
}
</style>
