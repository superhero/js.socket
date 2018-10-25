const
SocketDispatcher  = require('./dispatcher'),
SocketEmitter     = require('./emitter'),
SocketContext     = require('./context')

class SocketConnection
{
  constructor(log)
  {
    this.log        = log
    this.dispatcher = new SocketDispatcher(log)
    this.emitter    = new SocketEmitter(log)
  }

  onConnection(socket)
  {
    this.logSocketEvents(socket, this.log)
    const context = new SocketContext(socket, this.emitter)
    this.attachDataEventToDispatcherWithAContext(socket, this.dispatcher, context)
  }

  /**
   * @protected
   */
  logSocketEvents(socket, log)
  {
    for(const event of ['close','connection','drain','end','lookup','timeout'])
      socket.on(event, () => log.info('connection:', event))

    for(const event of ['error'])
      socket.on(event, (...a) => log.info('connection:', event, ...a))
  }

  /**
   * @protected
   */
  attachDataEventToDispatcherWithAContext(socket, dispatcher, context)
  {
    socket.on('data', dispatcher.dispatch.bind(dispatcher, context))
  }
}

module.exports = SocketConnection
