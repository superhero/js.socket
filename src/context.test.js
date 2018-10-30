describe('Context', () =>
{
  const expect = require('chai').expect

  it('expected format', () =>
  {
    const
    Debug         = require('@superhero/debug'),
    log           = new Debug({ debug:false }),
    Emitter       = require('./emitter'),
    emitter       = Emitter.from(log),
    NetSocket     = require('net').Socket,
    netSocket     = new NetSocket,
    Context       = require('./context'),
    context       = Context.from(netSocket, emitter),
    PayloadStack  = require('./payload-stack')

    expect(context.socket).deep.equal(netSocket)
    expect(context.emit).to.be.a('function')
    expect(context.payloadStack).to.be.an.instanceof(PayloadStack)
  })
})
