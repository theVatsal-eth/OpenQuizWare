import  express  from 'express'
import { createServer } from 'http'
import { env } from 'process'

import { Server } from 'socket.io'

import log from './logger'
import openSocket from './socket'

const port = Number(env.PORT)
const host = env.HOST

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
    serveClient: false
})

app.get("/rooms/:roomId", () => {
    openSocket({io})
})

httpServer.listen(port, host, () => {
    log.info("🚀Server is Running!!🚀")

    openSocket({io})
})
