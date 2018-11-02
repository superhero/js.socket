const SocketServer = require('.')

class SocketServerFactory
{
  /**
   * @param {Logger} log
   * @param {ConnectionObserverFactory} connectionObserverFactory
   * @param {net.Server} netServer
   */
  constructor(log, connectionObserverFactory, netServer)
  {
    this.log                = log
    this.netServer          = netServer
    this.connectionObserver = connectionObserverFactory.create()
  }

  /**
   * @returns {SocketServer}
   */
  create()
  {
    return new SocketServer(this.log, this.connectionObserver, this.netServer)
  }
}

module.exports = SocketServerFactory
