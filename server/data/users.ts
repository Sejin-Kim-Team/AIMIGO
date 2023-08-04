import type { User, UserPushUpdateRequest } from '~/server/types/types'
import { prisma } from '~/server/utils/prisma'

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany({
    where: {},
  })
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email },
  })
}
export async function getUser(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  })
}

export async function getUsersWherePushEnabled(time: number): Promise<User[]> {
  return await prisma.user.findMany({
    where: {
      pushEnabled: true,
      aimigoEnergy: { gte: 30 },
      OR: [
        {
          pushPermitStartTime: { gte: time },
          pushPermitEndTime: { lte: time },
        }, {
          pushPermitStartTime: time,
        },
        {
          pushPermitEndTime: time,
        },
      ],
    },
  })
}

export async function createUser(email: string, name: string): Promise<User> {
  return await prisma.user.create({
    data: {
      email,
      name,
      remainedHeart: 20,
    },
  })
}

export async function updateUserAimigoEnergy(id: string, aimigoEnergy: number): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data: { aimigoEnergy },
  })
}

export async function updateUserHeart(id: string, remainedHeart: number): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data: { remainedHeart },
  })
}

export async function updateAimigoInfo(id: string, aimigoName: string, aimigoMbti: string): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data: { aimigoName, aimigoMbti },
  })
}
export async function updateUserPushTime(id: string, pushUpdateRequest: UserPushUpdateRequest): Promise<User> {
  const { name, pushPermitStartTime, pushPermitEndTime, pushEnabled, pushToken } = pushUpdateRequest
  return await prisma.user.update({
    where: { id },
    data: {
      name,
      pushEnabled,
      pushPermitStartTime,
      pushPermitEndTime,
      pushToken,
    },
  })
}

export async function updateUserLastPushTime(id: string, lastPushTime: Date, aimigoEnergy: number): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data: {
      lastPushTime,
      aimigoEnergy,
    },
  })
}
export async function deleteUser(id: string): Promise<User> {
  return await prisma.user.delete({
    where: { id },
  })
}
