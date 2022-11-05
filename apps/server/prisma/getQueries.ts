import { PrismaClient } from '@prisma/client'
import log from '../src/logger'

const prisma = new PrismaClient()

const getAllStudents = async () => {
    try {
        await prisma.$connect()
        const students = await prisma.student.findMany()
        await prisma.$disconnect()
        return students
    } catch (error) {
        log.error(error)
        await prisma.$disconnect()
        throw new Error(error)
    }
}


const getStudentsByCollege = async (collegeId: string) => {
    try {
        await prisma.$connect()
        const ids = await prisma.college.findFirst({
            where: {
                address: collegeId
            },
            select: {
                studentsAddresses: true
            }
        })

        const idArr = ids?.studentsAddresses

        const students = await idArr?.map((id) => {
            return prisma.student.findMany({
                where: {
                    address: id
                }
            })
        })
        prisma.$disconnect()

        return students
    } catch (error) {
        log.error(error)
        await prisma.$disconnect()
        throw new Error(error)
    }

}

const getStudentsByAddress = async (address: string) => {
    try {
        await prisma.$connect()
        const student = prisma.student.findUnique({
            where: {
                address: address
            },
            select: {
                address: true,
                name: true,
                did: true,
                College: true
            }
        })

        prisma.$disconnect()

        return student
    } catch (error) {
        log.error(error)
        await prisma.$disconnect()
        throw new Error(error)
    }
}



const getCollegesJoinedByStudent = async (studentAddress: string) => {
    try {
        await prisma.$connect()
        const colleges = await prisma.student.findFirst({
            where: {
                address: studentAddress
            },
            select: {
                College: {
                    select: {
                        address: true,
                    }
                }
            }
        })
        await prisma.$disconnect()
        return colleges?.College

    } catch (error) {
        log.error(error)
        await prisma.$disconnect()
        throw new Error(error)
    }
}

const getAllQuizesByCollegeAddress = async (collegeAdd: string) => {
    try {
        await prisma.$connect()
        const quizes = await prisma.college.findMany({
            where: {
                address: collegeAdd
            },
            select: {
                Quiz: {
                    select: {
                        id: true,
                        name: true,
                        questions: {
                            select: {
                                question: true,
                                options: true,
                                correctOption: true,
                                level: true
                            }
                        }
                    }
                }
            }
        })
        await prisma.$disconnect()

        return quizes
    } catch (error) {
        log.error(error)
        await prisma.$disconnect()
        throw new Error(error)

    }

}

export {
    getAllStudents,
    getStudentsByAddress,
    getStudentsByCollege,
    getAllQuizesByCollegeAddress,
    getCollegesJoinedByStudent
}