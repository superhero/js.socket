const
NetServer           = require('net').Server,
Socket              = require('./socket'),
ConnectionObserver  = require('./connection-observer')

/**
 * When a server needs to connect with another, one part must act as the
 * listener. This class is representing that listener.
 *
 * @extends Socket
 */
class SocketServer extends Socket
{
  /**
   * @param {Logger} log
   */
  static from(log)
  {
    const
    netServer           = new NetServer,
    connectionObserver  = ConnectionObserver.from(log),
    server              = new SocketServer(log, connectionObserver, netServer)

    return server
  }

  /**
   * @param {Logger} log
   * @param {ConnectionObserver} connectionObserver
   * @param {net.Server} server
   */
  constructor(log, connectionObserver, server)
  {
    super(log, connectionObserver)

    this.server = server
    this.logServerEvents(server, log)
  }

  /**
   * @param {number} port an unsigned integer
   */
  listen(port)
  {
    this.server.listen(port)
    this.attachConnectionEventToObserver(this.server, this.connectionObserver)
  }

  /**
   * @protected
   * @param {net.Server} server
   * @param {Logger} log
   */
  logServerEvents(server, log)
  {
    ['close','connection','listening']
    .forEach((event) => server.on(event, () => log.info(event)))

    server.on('error', (...a) => log.info('error', ...a))
  }

  /**
   * @protected
   * @param {net.Server} server
   * @param {ConnectionObserver} connectionObserver
   */
  attachConnectionEventToObserver(server, connectionObserver)
  {
    const observer = connectionObserver
    server.on('connection', observer.onConnection.bind(observer))
  }
}

module.exports = SocketServer
