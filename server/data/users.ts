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

export async function getUser(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      aimigos: true,
    },
  })
}

export async function createUser(oauthId: string, name: string): Promise<User> {
  return await prisma.user.create({
    data: {
      oauthId,
      name,
      remainedHeart: 5,
    },
  })
}

export async function updateUserHeart(oauthId: string, remainedHeart: number): Promise<User> {
  return await prisma.user.update({
    where: { oauthId },
    data: { remainedHeart },
  })
}

export async function updateUser(oauthId: string, name: string): Promise<User> {
  return await prisma.user.update({
    where: { oauthId },
    data: { name },
  })
}

export async function deleteUser(oauthId: string): Promise<User> {
  return await prisma.user.delete({
    where: { oauthId },
  })
}
