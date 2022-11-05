import { Server, Socket } from 'socket.io'
import log from '../logger'

const EVENTS = {
    connection: "connection",
    CLIENT: {
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
        JOIN_ROOM: "JOIN_ROOM",
        CREATE_ROOM: "CREATE_ROOM",
        CLOSE_ROOM: "CLOSE_ROOM"
    },
    SERVER: {
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE",
        ROOM_CREATED: "ROOM_CREATED",
        ERROR: "ERROR"
    }
}

const rooms: Record<string, {
    ownerAddress: string,
    ownerLive: boolean
}> = {}

function openSocket({ io }: { io: Server }) {

    log.info("Socket is live!")

    io.on(EVENTS.connection, (socket: Socket) => {

        log.info("A User Connected!")

        socket.on(EVENTS.CLIENT.CREATE_ROOM, (ownerAddress: string, quizId: string) => {

            const roomId = quizId

            rooms[roomId] = {
                ownerAddress: ownerAddress,
                ownerLive: false
            }

            log.info(`Room created for ${ownerAddress} with ID ${quizId}`)

            socket.emit(EVENTS.SERVER.ROOM_CREATED, rooms[roomId])
        })

        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId: string, userAddress: string) => {

            if (!rooms[roomId]) {
                socket.emit(EVENTS.SERVER.ERROR, "Room Doesn't Exist")
            }
            else if (rooms[roomId].ownerAddress === userAddress) {
                socket.join(roomId)
            }
            else if (!rooms[roomId].ownerLive) {
                socket.to(roomId).emit(EVENTS.SERVER.ERROR, {
                    errotType: "Host not live",
                    message: "Host has not joined the Quiz Room"
                })
            }
            else {
                socket.join(roomId)
                socket.emit(EVENTS.SERVER.JOINED_ROOM, "Room joined!")
                log.info("Someone joined the room!")
            }

        })

        socket.on(EVENTS.CLIENT.CLOSE_ROOM, (roomId: string) => {
            socket.leave(roomId)
            delete rooms[roomId]
        })
    })

}

export default openSocket