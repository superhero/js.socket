const ConnectionObserver = require('.')

/**
 * Responsible for attaching a dispacther to all data events on a socket
 */
class ConnectionObserverFactory
{
  /**
   * @param {Logger} log
   * @param {DispatcherFactory} dispatcherFactory
   * @param {EmitterFactory} emitterFactory
   * @param {ContextFactory} contextFactory
   */
  constructor(log, dispatcherFactory, emitterFactory, contextFactory)
  {
    this.log                = log
    this.dispatcherFactory  = dispatcherFactory
    this.emitterFactory     = emitterFactory
    this.contextFactory     = contextFactory
  }

  /**
   * @returns {ConnectionObserver}
   */
  create()
  {
    const
    emitter     = this.emitterFactory.create(),
    dispatcher  = this.dispatcherFactory.create()

    return new ConnectionObserver(this.log, dispatcher, emitter, this.contextFactory)
  }
}

module.exports = ConnectionObserverFactory
