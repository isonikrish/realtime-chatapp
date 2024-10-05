export const handleConnection = (socket, io) => {
    console.log('a user connected'+ socket.id)
    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
}