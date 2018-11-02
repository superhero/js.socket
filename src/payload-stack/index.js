const
PAYLOAD_HEADER_SIZE     = require('../payload').HEADER_SIZE,
IncompleteMessageError  = require('./error/incomplete-message')

/**
 * Stacking payloads in a buffer. When you recieve a message through the
 * network, it's added to the stack. As mesages can come in partial chunks,
 * they need to be buffered until we have recieved the complete message.
 * Messages can also be recieved in a batch of multiple messages, requiring an
 * instance to segregate the message stack.
 */
class PayloadStack
{
  /**
   * @param {Buffer} buffer initial buffer
   * @param {PayloadFactory} payloadFactory
   */
  constructor(buffer, payloadFactory)
  {
    this.stack          = buffer
    this.payloadFactory = payloadFactory
  }

  /**
   * Attempts to cut out the first message of the stack
   * @throws ERR_OUT_OF_RANGE
   * @throws ERR_INCOMPLETE_MESSAGE
   */
  shift()
  {
    const
    dtoSize     = this.stack.readInt32BE(0),
    payloadSize = dtoSize + PAYLOAD_HEADER_SIZE

    if(this.stack.length < payloadSize)
      throw new IncompleteMessageError

    const
    buffer  = this.stack.slice(PAYLOAD_HEADER_SIZE, payloadSize),
    dto     = JSON.parse(buffer.toString()),
    payload = this.payloadFactory.create(dto.event, dto.data)

    this.stack = this.stack.slice(payloadSize)

    return payload
  }

  /**
   * Adds a buffer to the stack
   * @param {...Buffer} buffer buffers to add to the stack
   */
  push(...buffer)
  {
    this.stack = Buffer.concat([this.stack, ...buffer])
  }
}

module.exports = PayloadStack
