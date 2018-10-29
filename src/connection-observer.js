const
Dispatcher  = require('./dispatcher'),
Emitter     = require('./emitter'),
Context     = require('./context')

/**
 * Responsible for attaching a dispacther to all data events on a socket
 */
class ConnectionObserver
{
  /**
   * @param {Logger} log
   */
  static from(log)
  {
    const
    dispatcher    = Dispatcher.from(log),
    emitter       = Emitter.from(log),
    createContext = Context.from,
    observer      = new ConnectionObserver(log, dispatcher, emitter, createContext)

    return observer
  }

  /**
   * @param {Logger} log
   * @param {Dispatcher} dispatcher
   * @param {Emitter} emitter
   * @param {Context~from} createContext
   */
  constructor(log, dispatcher, emitter, createContext)
  {
    this.log            = log
    this.dispatcher     = dispatcher
    this.emitter        = emitter
    this.createContext  = createContext
  }

  /**
   * @param {net.Socket} socket
   */
  onConnection(socket)
  {
    this.logSocketEvents(socket, this.log)
    const context = this.createContext(socket, this.emitter)
    this.attachDataEventToDispatcherWithAContext(socket, this.dispatcher, context)
  }

  /**
   * @protected
   * @param {net.Socket} socket
   * @param {Logger} log
   */
  logSocketEvents(socket, log)
  {
    ['close','connection','drain','end','lookup','timeout']
    .forEach((event) => socket.on(event, () => log.info('connection:', event)))

    socket.on('error', (...a) => log.info('connection:', 'error', ...a))
  }

  /**
   * @protected
   * @param {net.Socket} socket
   * @param {Dispatcher} dispatcher
   * @param {Context} context
   */
  attachDataEventToDispatcherWithAContext(socket, dispatcher, context)
  {
    socket.on('data', dispatcher.dispatch.bind(dispatcher, context))
  }
}

module.exports = ConnectionObserver
