import { PrismaClient } from '@prisma/client'
//TODO  refactor to use singleton class
export const prisma = new PrismaClient()
