/**
 * The context class works a bit like a session. It keeps track of the socket
 * used in the current dispatchment. It allows a controller to respond to the
 * sender of the event.
 */
class Context
{
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
