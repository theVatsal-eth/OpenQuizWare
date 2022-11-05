import { PrismaClient, Prisma } from '@prisma/client'
import log from '../src/logger'

const prisma = new PrismaClient()


type studentData = Prisma.StudentCreateInput
type collegeData = Prisma.CollegeCreateInput
type questionData = Prisma.QuestionCreateManyInput
type quizData = Prisma.QuizCreateInput

const addStudent = async (user: studentData) => {
    try {
        prisma.$connect()
        await prisma.student.create({ data: user })
        prisma.$disconnect()
    } catch (error) {
        log.error(error)
        await prisma.$disconnect()
        throw new Error(error)
    }
}

const addCollege = async (college: collegeData) => {
    try {
        await prisma.$connect()
        await prisma.college.create({ data: college })
        await prisma.$disconnect()
    } catch (error) {
        log.error(error)
        await prisma.$disconnect()
        throw new Error(error)
    }
}

const addStudentToCollege = async (studentAddress: string, collegeAdd: string) => {
    try {
        await prisma.$connect()
        const students = await prisma.college.findFirst({
            where: {
                address: collegeAdd
            },
            select: {
                students: true
            }
        })

        const selectedStudent = await prisma.student.findFirst({
            where: {
                address: studentAddress
            }, 
            select: {
                id: true,
                address: true
            }
        })

        if (!selectedStudent) throw new Error("Selected student not found")

        const newArr = students ? [...students.students, selectedStudent] : selectedStudent

        await prisma.college.update({
            where: {
                address: collegeAdd
            },
            data: {
                students: {
                    set: newArr
                }
            }
        })
        prisma.$disconnect()
    } catch (error) {
        log.error(error)
        await prisma.$disconnect()
        throw new Error(error)

    }
}

const createQuiz = async (quizName: string, collegeAdd: string, questions: questionData[]) => {
    try {
        await prisma.$connect()
        const quiz: quizData = {
            name: quizName,
            college: {
                connect: {
                    address: collegeAdd
                }
            },
            questions: {
                createMany: {
                    data: questions
                }
            },
        }
        await prisma.quiz.create({ data: quiz })
        await prisma.$disconnect()
    } catch (error) {
        log.error(error)
        await prisma.$disconnect()
        throw new Error(error)
    }
}

export {
    addCollege,
    addStudent,
    addStudentToCollege,
    createQuiz
}

