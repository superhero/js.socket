const
SocketClient = require('./client'),
SocketServer = require('./server')

class Socket
{
  constructor()
  {
    const
    client = new SocketClient,
    server = new SocketServer

    this.createClient = client.createClient.bind(client)
    this.createServer = server.createServer.bind(server)
  }
}

module.exports = Socket
