const express = require('express')
const { Server } = require('socket.io')

const app = express()
const server = app.listen(8080, () => console.log('Server Up'))

app.use(express.static('./public'))

const io = new Server(server)

let log = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    socket.broadcast.emit('alert')
    socket.emit('history', log)
    socket.on('message', data => {
        log.push({userId: socket.id, message: data})
        io.emit('history', log)
    })
})