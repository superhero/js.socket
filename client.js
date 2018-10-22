const
Socket = require('./socket'),
Client = new require('net').Client()

class SocketClient extends Socket
{
  createClient(port, host)
  {
    const client = new Client

    for(let event of ['close','connection','listening'])
      client.on(event, () => this.log(event))

    for(let event of ['error'])
      client.on(event, (...a) => this.log(event, ...a))

    client.connect(port, host, () => this.onConnection.bind(this))

    return client
  }
}

module.exports = SocketClient
