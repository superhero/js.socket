const Events = require('events')

class SocketDispatcher
{
  constructor(log)
  {
    this.log    = log
    this.events = new Events
  }

  dispatch(context, buffer)
  {
    this.log.info('data')
    context.payloadStack.push(buffer)
    this.loopThroughContextBufferToDispatchEachMessageOneByOne(context)
  }

  /**
   * @protected
   */
  loopThroughContextBufferToDispatchEachMessageOneByOne(context)
  {
    try
    {
      while(context.payloadStack.stack.length)
      {
        const dto = context.payloadStack.shift()
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
}

module.exports = SocketDispatcher
