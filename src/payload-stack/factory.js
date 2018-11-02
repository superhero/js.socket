const PayloadStack = require('./index')

class PayloadStackFactory
{
  /**
   * @param {PayloadFactory} payloadFactory
   */
  constructor(payloadFactory)
  {
    this.payloadFactory = payloadFactory
  }

  /**
   * @param {Buffer} buffer
   * @returns {PayloadStack}
   */
  create(buffer)
  {
    buffer = buffer || Buffer.from('')
    return new PayloadStack(buffer, this.payloadFactory)
  }
}

module.exports = PayloadStackFactory
