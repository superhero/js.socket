describe('Socket/Connection', () =>
{
  const expect = require('chai').expect

  it('attach data event to dispatcher with a context', () =>
  {
    const
    Debug             = require('@superhero/debug'),
    log               = new Debug({ debug:false }),
    Events            = require('events'),
    events            = new Events,
    SocketConnection  = require('./connection'),
    socketConnection  = new SocketConnection(log, events),
    NetSocket         = require('net').Socket,
    netSocket         = new NetSocket,
    dispatcher        = socketConnection.dispatcher,
    emitter           = socketConnection.emitter,
    SocketContext     = require('./context'),
    socketContext     = new SocketContext(netSocket, emitter)

    expect(netSocket.listenerCount('data')).to.be.equal(0)
    socketConnection.attachDataEventToDispatcherWithAContext(netSocket, dispatcher, context)
    expect(netSocket.listenerCount('data')).to.be.equal(1)
  })

  it('log socket events', () =>
  {
    const
    Debug             = require('@superhero/debug'),
    log               = new Debug({ debug:false }),
    Events            = require('events'),
    events            = new Events,
    SocketConnection  = require('./connection'),
    socketConnection  = new SocketConnection(log, events),
    NetSocket         = require('net').Socket,
    netSocket         = new NetSocket,
    emitter           = socketConnection.emitter

    for(const event of ['close','connection','drain','lookup','timeout','error'])
      expect(event + netSocket.listenerCount(event)).to.be.equal(event + 0)

    socketConnection.logSocketEvents(netSocket, log)

    for(const event of ['close','connection','drain','lookup','timeout','error'])
      expect(event + netSocket.listenerCount(event)).to.be.equal(event + 1)
  })

  it('the "onConnection" function attaches the expected listeners', () =>
  {
    const
    Debug             = require('@superhero/debug'),
    log               = new Debug({ debug:false }),
    Events            = require('events'),
    events            = new Events,
    SocketConnection  = require('./connection'),
    socketConnection  = new SocketConnection(log, events),
    NetSocket         = require('net').Socket,
    netSocket         = new NetSocket

    for(const event of ['close','connection','drain','lookup','timeout','error','data'])
      expect(event + netSocket.listenerCount(event)).to.be.equal(event + 0)

    socketConnection.onConnection(netSocket)

    for(const event of ['close','connection','drain','lookup','timeout','error','data'])
      expect(event + netSocket.listenerCount(event)).to.be.equal(event + 1)
  })
})
