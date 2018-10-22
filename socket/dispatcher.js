const IncompleteMessageError = require('./error/incomplete-message')

class SocketDispatcher
{
  constructor(log, events)
  {
    this.log    = log
    this.events = events
  }

  dispatch(context, data)
  {
    this.log('data')
    this.concatContextBufferWithPayload(context, data)
    this.loopThroughContextBufferToDispatchEachMessageOneByOne(context)
  }

  /**
   * @protected
   */
  loopThroughContextBufferToDispatchEachMessageOneByOne(context)
  {
    try
    {
      while(context.buffer.length)
      {
        const dto = this.shiftMessageFromContextBuffer(context)
        this.events.emit(dto.event, context, dto.data)
      }
    }
    catch(error)
    {
      this.handleError(error)
    }
  }

  /**
   * @protected
   */
  handleError(error)
  {
    switch(error.code)
    {
      case 'ERR_OUT_OF_RANGE':
      case 'ERR_INCOMPLETE_MESSAGE': break
      default: throw error
    }
  }

  /**
   * payload can come in multiple chunks that needs to be glued together
   * @protected
   */
  concatContextBufferWithPayload(context, data)
  {
    context.buffer = Buffer.concat([context.buffer, data].filter(_ => _))
  }

  /**
   * @protected
   * @throws ERR_OUT_OF_RANGE
   * @throws ERR_INCOMPLETE_MESSAGE
   */
  shiftMessageFromContextBuffer(context)
  {
    const
    headerSize  = 10,
    dtoSize     = context.buffer.readUIntBE(0, headerSize),
    payloadSize = dtoSize + headerSize

    if(context.buffer.length < payloadSize)
      throw new IncompleteMessageError

    const dto = context.buffer.slice(headerSize, payloadSize).toJSON()
    context.buffer = context.buffer.slice(payloadSize)

    return dto
  }
}

module.exports = SocketDispatcher
