import type { Aimigo } from '~/server/types/types'
import { prisma } from '~/server/utils/prisma'

export async function getAimigos(): Promise<Aimigo[]> {
  return await prisma.aimigo.findMany({
    where: {},
  })
}

export async function getAimigo(id: number): Promise<Aimigo> {
  return await prisma.aimigo.findUnique({
    where: { id },
  })
}

export async function createAimigo(oauthId: string, name: string, mbti: string) {
  return await prisma.aimigo.create({
    data: {
      name,
      mbti,
      user: { connect: { oauthId } },
    },
  })
}

export async function updateAimigoName(id: number, name: string) {
  return await prisma.aimigo.update({
    where: { id },
    data: { name },
  })
}

export async function deleteAimigo(id: number) {
  return await prisma.aimigo.delete({
    where: { id },
  })
}
