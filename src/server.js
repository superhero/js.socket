const
NetServer         = require('net').Server,
SocketConnection  = require('./connection')

class SocketServer
{
  constructor(log)
  {
    this.log        = log
    this.connection = new SocketConnection(log, this)
    this.server     = new NetServer

    this.logServerEvents(this.server, log)
  }

  listen(port)
  {
    this.server.listen(port)
    this.attachConnectionEventToObserver(this.server, this.connection)
  }

  on(...args)
  {
    this.connection.dispatcher.events.on(...args)
  }

  once(...args)
  {
    this.connection.dispatcher.events.once(...args)
  }

  /**
   * @protected
   */
  logServerEvents(server, log)
  {
    for(let event of ['close','connection','listening'])
      server.on(event, () => log.info(event))

    for(let event of ['error'])
      server.on(event, (...a) => log.info(event, ...a))
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
