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

  removeListener(...args)
  {
    this.connection.dispatcher.events.removeListener(...args)
  }

  /**
   * @protected
   */
  logServerEvents(server, log)
  {
    ['close','connection','listening']
    .forEach((event) => server.on(event, () => log.info(event)))

    server.on('error', (...a) => log.info('error', ...a))
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
