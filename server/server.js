import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)


server.listen(3001, () => {
  console.log('SERVER IS RUNNING')
})

