const PayloadStack = require('./payload-stack')

/**
 * The context class works a bit like a session. It keeps track of the socket
 * used in the current dispatchment. It allows a controller to respond to the
 * sender of the event.
 */
class Context
{
  /**
   * @param {net.Socket} socket
   * @param {Emitter} emitter
   */
  static from(socket, emitter)
  {
    const
    emit          = emitter.emit.bind(emitter, socket),
    payloadStack  = PayloadStack.from(),
    context       = new Context(socket, emit, payloadStack)

    return context
  }

  /**
   * @param {net.Socket} socket
   * @param {Context~emit} emit
   * @param {PayloadStack} payloadStack
   */
  constructor(socket, emit, payloadStack)
  {
    this.socket       = socket
    this.emit         = emit
    this.payloadStack = payloadStack
  }
}

module.exports = Context

/**
 * @callback Context~emit
 * @param {string} event
 * @param {*} data
 */
