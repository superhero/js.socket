const
Socket = require('./socket'),
Client = new require('net').Client()

class SocketClient extends Socket
{
  constructor(port, host)
  {
    super()

    this.client = new Client

    for(let event of ['close','connection','listening'])
      this.client.on(event, () => this.log(event))

    for(let event of ['error'])
      this.client.on(event, (...a) => this.log(event, ...a))

    this.client.connect(port, host, () => this.onConnection.bind(this))
  }
}

module.exports = SocketServer
