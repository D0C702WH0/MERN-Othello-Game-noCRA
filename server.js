const http = require('http')
const app = require('./expressApp')
const socketio = require('socket.io')

const port = process.env.PORT || '3000'

app.set('port', port)
const server = http.createServer(app)
const io = socketio.listen(server)
app.set('socketIo', io)

module.exports = { app, server }

server.listen(port, () => console.log('Server listenning on:', port))
