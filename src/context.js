const SocketPayloadStack = require('./payload-stack')

class SocketContext
{
  constructor(socket, emitter)
  {
    this.socket       = socket
    this.emit         = emitter.emit.bind(emitter, socket)
    this.payloadStack = new SocketPayloadStack
  }
}

module.exports = SocketContext
