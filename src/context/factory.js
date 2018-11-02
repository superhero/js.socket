const Context = require('.')

/**
 * The context class works a bit like a session. It keeps track of the socket
 * used in the current dispatchment. It allows a controller to respond to the
 * sender of the event.
 */
class ContextFactory
{
  /**
   * @param {PayloadStackFactory} payloadStackFactory
   */
  constructor(payloadStackFactory)
  {
    this.payloadStackFactory = payloadStackFactory
  }

  /**
   * @param {net.Socket} socket
   * @param {Emitter} emitter
   * @returns {Context}
   */
  create(socket, emitter)
  {
    const
    emit          = emitter.emit.bind(emitter, socket),
    payloadStack  = this.payloadStackFactory.create(),
    context       = new Context(socket, emit, payloadStack)

    return context
  }
}

module.exports = ContextFactory
