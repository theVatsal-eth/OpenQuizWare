import express from 'express'
// import { Prisma } from '@prisma/client'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { env } from 'process'

import log from './logger'
import openSocket from './socket'
import { 
    getAllQuizesByCollegeAddress,
    getAllStudents,
    getCollegesJoinedByStudent,
    getStudentsByAddress,
    getStudentsByCollege
} from "../prisma/getQueries"
import { 
    addCollege,
    addStudent,
    addStudentToCollege,
    createQuiz
} from '../prisma/setQueries'

const port = Number(env.PORT)
const host = env.HOST

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {

})
app.use(express.json())

app.get("/students", async (_, res) => {
    log.info("/Students")
    try {
        const students = await getAllStudents()
        log.info(students)
        res.send({ students })
    } catch (error) {
        res.status(503).send(error)
    }
})

app.post("/students", async (req, res) => {
    const data = (req.body)
    if (!data) {
        res.status(503)
        res.send("Invalid Data")
    }
    try {
        await addStudent(data)
        res.send("Success!")
    } catch (error) {
        res.status(503)
        res.send(error)
    }
})

app.get("/students/:studentAddress", async (req, res) => {
    const studentAddress = req.params.studentAddress

    if (!studentAddress) {
        res.status(503).send("Invalid Data")
    }

    try {
        const student = await getStudentsByAddress(studentAddress)
        res.status(200).send(student)
    } catch (error) {
        res.status(503).send(error)
    }
})

app.get("/colleges/:studentAddress", async (req, res) => {
    const studentAddress = req.params.studentAddress

    if (!studentAddress) {
        res.status(503).send("Invalid Data!")
    }

    try {
        const colleges = await getCollegesJoinedByStudent(studentAddress)
        res.status(200).send(colleges)
    } catch (error) {
        res.status(503).send(error)
    }
})

app.get("/students/:collegeId", async (req, res) => {
    const collegeAddress = req.params.collegeId
    if (!collegeAddress) {
        res.status(503).send("Invalid Data")
    }

    try {
        const students = await getStudentsByCollege(collegeAddress)
        res.status(200).send(students)
    } catch (error) {
        res.status(503).send("Invalid Data")
    }
})

app.get("/colleges/:address", async (req, res) => {
    const { address } = req.params
    try {
        const colleges = await getCollegesJoinedByStudent(address)
        log.info(colleges)
        res.send({ colleges })
    } catch (error) {
        res.status(503)
        res.send(error)
    }
})

app.post("/colleges", async (req, res) => {
    const data = req.body

    if (!data) {
        res.status(503)
        res.send("Invalid Data Sent")
    }

    try {
        await addCollege(data)
        res.send("Success!")
    } catch (error) {
        res.status(503)
        res.send(error)
    }
})

app.post("/colleges/:studentAddress/:collegeAddress", async (req, res) => {

    const studentAddress = req.params.studentAddress
    const collegeAddress = req.params.collegeAddress

    if (!studentAddress || !collegeAddress) {
        res.status(503)
        res.send("Invalid Queries")
    }

    try {
        await addStudentToCollege(studentAddress, collegeAddress)
        res.send("Success!")
    } catch (error) {
        res.status(503)
        res.send(error)
    }
})

app.post("/quiz/:collegeAddress/:quizName", async (req, res) => {
    const collegeAddress = req.params.collegeAddress
    const quizName = req.params.quizName
    const questions = req.body

    if (!collegeAddress || !quizName || !questions) {
        res.status(503)
        res.send("Invalid Data!")
    }

    try {
        await createQuiz(quizName, collegeAddress, questions)
        res.status(200).send("Success!")
    } catch (error) {
        res.status(503).send(error)
    }
})

app.get("/quiz/:collegeAdd", async (req, res) => {
    const collegeAdd = req.params.collegeAdd

    if (!collegeAdd) {
        res.status(503).send("Invalid Data")
    }

    try {
        const quizes = await getAllQuizesByCollegeAddress(collegeAdd)
        res.send(quizes)
    } catch (error) {
        res.status(503).send(error)

    }
})

httpServer.listen(port, host, () => {
    log.info("🚀Server is Running!!🚀")
    openSocket({ io })
})
