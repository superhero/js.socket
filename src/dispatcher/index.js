/**
 * Responsible for dispatching events from the payload stack
 */
class Dispatcher
{
  /**
   * @param {Logger} log
   * @param {events} events
   */
  constructor(log, events)
  {
    this.log    = log
    this.events = events
  }

  /**
   * @param {Context} context
   * @param {Buffer} buffer
   */
  dispatch(context, buffer)
  {
    this.log.info('data')
    context.payloadStack.push(buffer)
    this.loopThroughContextBufferToDispatchEachMessageOneByOne(context)
  }

  /**
   * @protected
   * @param {Context} context
   */
  loopThroughContextBufferToDispatchEachMessageOneByOne(context)
  {
    try
    {
      while(context.payloadStack.stack.length)
      {
        const dto = context.payloadStack.shift()
        this.log.info('trigger:', dto.event, dto.data)
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
   * @param {Error} error
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

module.exports = Dispatcher
