const Client = require('.')

class ClientFactory
{
  /**
   * @param {Logger} log
   * @param {ConnectionObserverFactory} connectionObserverFactory
   * @param {net.Socket} netSocket
   */
  constructor(log, connectionObserverFactory, netSocket)
  {
    this.log                = log
    this.netSocket          = netSocket
    this.connectionObserver = connectionObserverFactory.create()
  }

  /**
   * @returns {Client}
   */
  create()
  {
    return new Client(this.log, this.connectionObserver, this.netSocket)
  }
}

module.exports = ClientFactory
