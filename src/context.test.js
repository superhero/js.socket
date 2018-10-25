describe('Socket/Context', () =>
{
  const expect = require('chai').expect

  it('expected format', () =>
  {
    const
    Debug         = require('@superhero/debug'),
    log           = new Debug({ debug:false }),
    Emitter       = require('./emitter'),
    emitter       = new Emitter(log),
    NetSocket     = require('net').Socket,
    netSocket     = new NetSocket,
    SocketContext = require('./context'),
    socketContext = new SocketContext(netSocket, emitter),
    PayloadStack  = require('./payload-stack')

    expect(socketContext.socket).deep.equal(netSocket)
    expect(socketContext.emit).to.be.a('function')
    expect(socketContext.payloadStack).to.be.an.instanceof(PayloadStack)
  })
})
