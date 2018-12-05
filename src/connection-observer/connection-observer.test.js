describe('ConnectionObserver', () =>
{
  const expect = require('chai').expect

  it('attach data event to dispatcher with a context', () =>
  {
    const
    Debug               = require('@superhero/debug'),
    log                 = new Debug({ debug:false }),
    Factory             = require('../../'),
    factory             = new Factory,
    connectionObserver  = factory.createConnectionObserverFactory(log).create(),
    netSocket           = factory.createNetSocket(),
    dispatcher          = connectionObserver.dispatcher,
    emitter             = connectionObserver.emitter,
    context             = factory.createContextFactory().create(netSocket, emitter)

    expect(netSocket.listenerCount('data')).to.be.equal(0)
    connectionObserver.attachDataEventToDispatcherWithAContext(netSocket, dispatcher, context)
    expect(netSocket.listenerCount('data')).to.be.equal(1)
  })

  it('log socket events', () =>
  {
    const
    Debug               = require('@superhero/debug'),
    log                 = new Debug({ debug:false }),
    Factory             = require('../../'),
    factory             = new Factory,
    connectionObserver  = factory.createConnectionObserverFactory(log).create(),
    netSocket           = factory.createNetSocket(),
    emitter             = connectionObserver.emitter

    for(const event of ['close','connection','drain','lookup','timeout','error'])
      expect(event + netSocket.listenerCount(event)).to.be.equal(event + 0)

    connectionObserver.logSocketEvents(netSocket, log)

    for(const event of ['close','connection','drain','lookup','timeout','error'])
      expect(event + netSocket.listenerCount(event)).to.be.equal(event + 1)
  })

  it('the "onConnection" function attaches the expected listeners', () =>
  {
    const
    Debug               = require('@superhero/debug'),
    log                 = new Debug({ debug:false }),
    Factory             = require('../../'),
    factory             = new Factory,
    connectionObserver  = factory.createConnectionObserverFactory(log).create(),
    netSocket           = factory.createNetSocket()

    for(const event of ['close','connection','drain','lookup','timeout','error','data'])
      expect(event + netSocket.listenerCount(event)).to.be.equal(event + 0)

    connectionObserver.onConnection(netSocket)

    for(const event of ['close','connection','drain','lookup','timeout','error','data'])
      expect(event + netSocket.listenerCount(event)).to.be.equal(event + 1)
  })
})
