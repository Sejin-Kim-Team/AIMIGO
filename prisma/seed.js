const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Alice',
    oauthId: '1234567890',
    remainedHeart: 5,
  },
  {
    name: 'Nilu',
    oauthId: '1234567891',
    remainedHeart: 5,
  },
]
async function main() {
  console.log('Start seeding ...')
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
