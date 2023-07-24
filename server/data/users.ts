import type { User } from '~/server/types/types'
import { prisma } from '~/server/utils/prisma'

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany({
    where: {},
    include: {
      aimigos: true,
    },
  })
}

export async function getUser(oauthId: string): Promise<User> {
  return await prisma.user.findUnique({
    where: { oauthId },
    include: {
      aimigos: true,
    },
  })
}

export async function createUser(oauthId: string, name: string) {
  return await prisma.user.create({
    data: {
      oauthId,
      name,
      remainedHeart: 5,
    },
  })
}

export async function updateUserHeart(oauthId: string, remainedHeart: number) {
  return await prisma.user.update({
    where: { oauthId },
    data: { remainedHeart },
  })
}

export async function updateUser(oauthId: string, name: string) {
  return await prisma.user.update({
    where: { oauthId },
    data: { name },
  })
}

export async function deleteUser(oauthId: string) {
  return await prisma.user.delete({
    where: { oauthId },
  })
}
