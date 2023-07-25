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

export async function updateUserHeart(id: string, remainedHeart: number): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data: { remainedHeart },
  })
}

export async function updateUser(id: string, name: string): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data: { name },
  })
}

export async function deleteUser(id: string): Promise<User> {
  return await prisma.user.delete({
    where: { id },
  })
}
