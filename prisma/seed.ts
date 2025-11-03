import { PrismaClient, ROLE_TITLE } from '@prisma/client'
import bcrypt from "bcrypt"

const prisma = new PrismaClient()
async function main() {
    const existingRole = await prisma.roles.findFirst()
    
    if(!existingRole) {
        await prisma.roles.createMany({
            data: [
                {
                    roleId: 1,
                    roleName: ROLE_TITLE.SUPER_ADMIN
                },
                {
                    roleId: 2,
                    roleName: ROLE_TITLE.USER
                }
            ]
        })
    }
    
    await prisma.users.upsert({
        where: { email: 'shwdme-admin@yopmail.com' },
        update: {},
        create: {
          email: 'shwdme-admin@yopmail.com',
          fName: 'Shwdme',
          password: await bcrypt.hash("Password@123", 10),
          roleId: 1
        }
    })
}
main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Seeder Successfully executed")
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })