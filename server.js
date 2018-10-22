const
NetServer         = new require('net').Server(),
SocketConnection  = require('./socket/connection')

class SocketServer
{
  createClient(log, events)
  {
    const
    connection  = new SocketConnection(log, events),
    server      = new NetServer

    this.logServerEvents(server, log)
    this.attachConnectionEventToObserver(server, connection)

    return server
  }

  /**
   * @protected
   */
  logServerEvents(server, log)
  {
    for(let event of ['close','connection','listening'])
      server.on(event, () => log(event))

    for(let event of ['error'])
      server.on(event, (...a) => log(event, ...a))
  }

  /**
   * @protected
   */
  attachConnectionEventToObserver(server, connection)
  {
    server.on('connection', connection.onConnection.bind(connection))
  }
}

module.exports = SocketServer
