<script setup lang="ts">
import Avatar01 from '~/assets/images/avatar-01.png'
import Avatar02 from '~/assets/images/avatar-02.png'
import { useElementHover } from '#imports'
import { HEART_CHARGING, HEART_FULL, HEART_ZERO } from '~/constants/icon.constants'
import type { User } from '~/server/types/types'

const { status, signOut, getSession } = useAuth()
const iconRef = ref<HTMLElement>()
const iconIsHovered = useElementHover(iconRef)
const iconSrc = computed(() => iconIsHovered.value ? Avatar02 : Avatar01)

const thisUser = ref<User | null>(null)
const heart = ref<number>(5)

const computedHeart = computed(() => {
  if (heart.value === 5)
    return HEART_FULL
  else if (heart.value === 0)
    return HEART_ZERO
  else return HEART_CHARGING
})

async function getUser() {
  const session = await getSession()
  if (!session)
    throw new Error('Unauthenticated')

  const email = session.user?.email ?? ''
  const { data } = await useFetch('/api/users', {
    method: 'GET',
    params: { email },
  })

  thisUser.value = data.value?.body ?? null

  if (!thisUser.value)
    throw new Error('User not found')

  heart.value = thisUser.value.remainedHeart ?? 0
  if (heart.value > 5)
    heart.value = 5
  // TODO: 실제로 5개로 update 로직 필요.
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost m-1">
            <img :src="iconSrc" alt="avatar" class="w-8 h-8">
          </label>
          <ul v-if="status === 'authenticated' && thisUser" tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li class="p-4 text-lg">
              반가워요, {{ thisUser.name }}!
            </li>

            <li @click="navigateTo('/mypage')">
              <a>마이페이지</a>
            </li>

            <li @click="signOut({ callbackUrl: '/login' })">
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
          <Icon :name="computedHeart" :size="24" /> {{ heart }}
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
