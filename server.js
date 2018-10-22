const
Socket = require('./socket'),
Server = new require('net').Server()

class SocketServer extends Socket
{
  createServer()
  {
    const server = new Server

    for(let event of ['close','connection','listening'])
      server.on(event, () => this.log(event))

    for(let event of ['error'])
      server.on(event, (...a) => this.log(event, ...a))

    server.on('connection', this.onConnection.bind(this))

    return server
  }
}

module.exports = SocketServer
