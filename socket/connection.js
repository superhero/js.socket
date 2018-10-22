const
SocketDispatcher  = require('./socket/dispatcher'),
SocketEmitter     = require('./socket/emitter')

class SocketConnection
{
  constructor(log, events)
  {
    this.log        = log
    this.dispatcher = new SocketDispatcher(log, events)
    this.emitter    = new SocketEmitter(log)
  }

  onConnection(socket)
  {
    this.logSocketEvents(socket, log)
    const context = this.createContext(socket, this.emitter)
    this.attachConnectionEventToDispatcherWithAContext(this.dispatcher, context)
  }

  /**
   * @protected
   */
  logSocketEvents(socket, log)
  {
    for(let event of ['close','connection','drain','end','lookup','timeout'])
      socket.on(event, () => log('connection:', event))

    for(let event of ['error'])
      socket.on(event, (...a) => log('connection:', event, ...a))
  }

  /**
   * @protected
   */
  createContext(socket, emitter)
  {
    const context   = { socket }
    context.emit    = emitter.emit.bind(emitter, socket)
    context.chunks  = []

    return context
  }

  /**
   * @protected
   */
  attachDataEventToDispatcherWithAContext(dispatcher, context)
  {
    socket.on('data', dispatcher.dispatch.bind(dispatcher, context))
  }
}

module.exports = SocketConnection
