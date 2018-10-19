const
Socket = require('./socket'),
Server = new require('net').Server()

class SocketServer extends Socket
{
  constructor()
  {
    super()

    this.server = new Server

    for(let event of ['close','connection','listening'])
      this.server.on(event, () => this.log(event))

    for(let event of ['error'])
      this.server.on(event, (...a) => this.log(event, ...a))

    this.server.on('connection', this.onConnection.bind(this))
  }
}

module.exports = SocketServer
