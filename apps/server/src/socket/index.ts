import { Server, Socket } from 'socket.io'
import log from 'src/logger'

const EVENTS = {
    connection: "connection",
    CLIENT: {
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
        JOIN_ROOM: "JOIN_ROOM",
        CREATE_ROOM: "CREATE_ROOM",
    },
    SERVER: {
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE",
        ROOM_CREATED: "ROOM_CREATED",
        ERROR: "ERROR"
    }
}

const rooms: Record<string, { ownerAddress: string }> = {}

function openSocket({ io }: { io: Server }) {

    log.info("Socket is live!")

    io.on(EVENTS.connection, (socket: Socket) => {

        log.info("A User Connected!")

        socket.on(EVENTS.CLIENT.CREATE_ROOM, (ownerAddress: string, quizId: string) => {

            const roomId = quizId

            rooms[roomId] = {
                ownerAddress: ownerAddress
            }

            socket.emit(EVENTS.SERVER.ROOM_CREATED, rooms[roomId])
        })

        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId: string) => {

            if (!rooms[roomId]) {
                socket.emit(EVENTS.SERVER.ERROR, "Room Doesn't Exist")
            } else {
                socket.join(roomId)
                socket.emit(EVENTS.SERVER.JOINED_ROOM, "You have joined the quiz!")
            }

        })

        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, (message: string, roomId: string, userName: string) => {
            const date = new Date()

            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                userName,
                time: `${date.getHours()}:${date.getMinutes()}`
            })
        })
    })

}

export default openSocket