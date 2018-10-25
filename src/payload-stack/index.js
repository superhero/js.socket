const
SocketPayload           = require('./payload'),
IncompleteMessageError  = require('./error/incomplete-message')

class SocketPayloadStack
{
  constructor()
  {
    this.stack = Buffer.from('')
  }

  /**
   * @throws ERR_OUT_OF_RANGE
   * @throws ERR_INCOMPLETE_MESSAGE
   */
  shift()
  {
    const
    headerSize  = SocketPayload.HEADER_SIZE,
    dtoSize     = this.stack.readInt32BE(0),
    payloadSize = dtoSize + headerSize

    if(this.stack.length < payloadSize)
      throw new IncompleteMessageError

    const
    payload = this.stack.slice(headerSize, payloadSize).toString(),
    dto     = JSON.parse(payload)

    this.stack  = this.stack.slice(payloadSize)

    return new SocketPayload(dto.event, dto.data)
  }

  push(...buffer)
  {
    this.stack = Buffer.concat([this.stack, ...buffer])
  }
}

module.exports = SocketPayloadStack
