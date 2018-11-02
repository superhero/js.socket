const Emitter = require('.')

/**
 * Responsible for emitting a message over the network
 */
class EmitterFactory
{
  /**
   * @param {Logger} log
   * @param {PayloadFactory} payloadFactory
   */
  constructor(log, payloadFactory)
  {
    this.log            = log
    this.payloadFactory = payloadFactory
  }

  /**
   * @returns {Emitter}
   */
  create()
  {
    return new Emitter(this.log, this.payloadFactory)
  }
}

module.exports = EmitterFactory
