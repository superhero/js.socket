/**
 * A facade to the socket connections dispatchers event bus
 */
class Socket
{
  /**
   * @param {Logger} log
   * @param {ConnectionObserver} connectionObserver
   */
  constructor(log, connectionObserver)
  {
    this.log                = log
    this.connectionObserver = connectionObserver
  }

  /**
   * @param {string} event
   * @param {function} observer
   */
  on(...args)
  {
    this.connectionObserver.dispatcher.events.on(...args)
  }

  /**
   * @param {string} event
   * @param {function} observer
   */
  once(...args)
  {
    this.connectionObserver.dispatcher.events.once(...args)
  }

  /**
   * @param {string} event
   * @param {function} observer
   */
  removeListener(...args)
  {
    this.connectionObserver.dispatcher.events.removeListener(...args)
  }
}

module.exports = Socket
