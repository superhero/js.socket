module.exports = new class
{
  createClient(log)
  {
    log = log || console

    const
    netSocket                 = this.createNetSocket(),
    connectionObserverFactory = this.createConnectionObserverFactory(log),
    ClientFactory             = require('./src/client/factory'),
    clientFactory             = new ClientFactory(log, connectionObserverFactory, netSocket),
    client                    = clientFactory.create()

    return client
  }

  createServer(log)
  {
    log = log || console

    const
    netServer                 = this.createNetServer(),
    connectionObserverFactory = this.createConnectionObserverFactory(log),
    ServerFactory             = require('./src/server/factory'),
    serverFactory             = new ServerFactory(log, connectionObserverFactory, netServer),
    server                    = serverFactory.create()

    return server
  }

  /**
   * @private
   */
  createNetSocket()
  {
    const
    NetSocket = require('net').Socket,
    netSocket = new NetSocket({ readable:true, writable:true })

    return netSocket
  }

  /**
   * @private
   */
  createNetServer()
  {
    const
    NetServer = require('net').Server,
    netServer = new NetServer

    return netServer
  }

  /**
   * @private
   */
  createConnectionObserverFactory(log)
  {
    const
    dispatcherFactory         = this.createDispatcherFactory(log),
    emitterFactory            = this.createEmitterFactory(log),
    contextFactory            = this.createContextFactory(log),
    ConnectionObserverFactory = require('./src/connection-observer/factory'),
    connectionObserverFactory = new ConnectionObserverFactory(log, dispatcherFactory, emitterFactory, contextFactory)

    return connectionObserverFactory
  }

  /**
   * @private
   */
  createDispatcherFactory(log)
  {
    const
    eventsFactory     = this.createEventsFactory(),
    DispatcherFactory = require('./src/dispatcher/factory'),
    dispatcherFactory = new DispatcherFactory(log, eventsFactory)

    return dispatcherFactory
  }

  /**
   * @private
   */
  createContextFactory(log)
  {
    const
    payloadStackFactory = this.createPayloadStackFactory(),
    ContextFactory      = require('./src/context/factory'),
    contextFactory      = new ContextFactory(payloadStackFactory)

    return contextFactory
  }

  /**
   * @private
   */
  createEmitterFactory(log)
  {
    const
    payloadFactory = this.createPayloadFactory(),
    EmitterFactory = require('./src/emitter/factory'),
    emitterFactory = new EmitterFactory(log, payloadFactory)

    return emitterFactory
  }

  /**
   * @private
   */
  createPayloadStackFactory()
  {
    const
    payloadFactory      = this.createPayloadFactory(),
    PayloadStackFactory = require('./src/payload-stack/factory'),
    payloadStackFactory = new PayloadStackFactory(payloadFactory)

    return payloadStackFactory
  }

  /**
   * @private
   */
  createPayloadFactory()
  {
    const
    PayloadFactory = require('./src/payload/factory'),
    payloadFactory = new PayloadFactory()

    return payloadFactory
  }

  /**
   * @private
   */
  createEventsFactory()
  {
    const
    EventsFactory = require('./src/events/factory'),
    eventsFactory = new EventsFactory()

    return eventsFactory
  }
}
