import type { Aimigo } from '~/server/types/types'
import { prisma } from '~/server/utils/prisma'

export async function getAimigos(userId: string): Promise<Aimigo[]> {
  return await prisma.aimigo.findMany({
    where: { userId },
  })
}

export async function getAimigo(id: number): Promise<Aimigo | null> {
  return await prisma.aimigo.findUnique({
    where: { id },
  })
}

export async function createAimigo(id: string, name: string, mbti: string): Promise<Aimigo> {
  return await prisma.aimigo.create({
    data: {
      name,
      mbti,
      user: { connect: { id } },
    },
  })
}

export async function updateAimigoName(id: number, name: string): Promise<Aimigo> {
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
