const
Payload                 = require('./payload'),
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
  static from()
  {
    const buffer = Buffer.from('')
    return new PayloadStack(buffer)
  }

  /**
   * @param {Buffer} buffer initial buffer
   */
  constructor(buffer)
  {
    this.stack = buffer
  }

  /**
   * Attempts to cut out the first message of the stack
   * @throws ERR_OUT_OF_RANGE
   * @throws ERR_INCOMPLETE_MESSAGE
   */
  shift()
  {
    const
    headerSize  = Payload.HEADER_SIZE,
    dtoSize     = this.stack.readInt32BE(0),
    payloadSize = dtoSize + headerSize

    if(this.stack.length < payloadSize)
      throw new IncompleteMessageError

    const
    payload = this.stack.slice(headerSize, payloadSize).toString(),
    dto     = JSON.parse(payload)

    this.stack  = this.stack.slice(payloadSize)

    return new Payload(dto.event, dto.data)
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
