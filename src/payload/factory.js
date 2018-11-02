const Payload = require('./index')

/**
 * Represent a package of data to send over the network
 */
class PayloadFactory
{
  /**
   * @param {string} event
   * @param {*} data
   * @returns {Payload}
   */
  create(event, data)
  {
    return new Payload(event, data)
  }
}

module.exports = PayloadFactory
