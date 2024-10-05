import { handleConnection } from '../controllers/socket.js'

export const socket = (io) =>{
    io.on('connection', (socket) => {
        handleConnection(socket, io)
    })


}