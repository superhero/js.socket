const
NetClient         = new require('net').Client(),
SocketConnection  = require('./socket/connection')

class SocketClient
{
  createClient(log, events, port, host)
  {
    const
    connection  = new SocketConnection(log, events),
    client      = new NetClient

    this.logClientEvents(client, log)
    this.connectClientToHost(client, connection, port, host)

    return client
  }

  /**
   * @protected
   */
  logClientEvents(client, log)
  {
    for(let event of ['close','connection','listening'])
      client.on(event, () => log(event))

    for(let event of ['error'])
      client.on(event, (...a) => log(event, ...a))
  }

  /**
   * @protected
   */
  connectClientToHost(client, connection, port, host)
  {
    client.connect(port, host, connection.onConnection.bind(connection))
  }
}

module.exports = SocketClient
