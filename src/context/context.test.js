describe('Context', () =>
{
  const expect = require('chai').expect

  it('expected format', () =>
  {
    const
    Debug         = require('@superhero/debug'),
    log           = new Debug({ debug:false }),
    Factory       = require('../../'),
    factory       = new Factory,
    emitter       = factory.createEmitterFactory(log).create(),
    netSocket     = factory.createNetSocket(),
    context       = factory.createContextFactory(log).create(netSocket, emitter),
    PayloadStack  = require('../payload-stack')

    expect(context.socket).deep.equal(netSocket)
    expect(context.emit).to.be.a('function')
    expect(context.payloadStack).to.be.an.instanceof(PayloadStack)
  })
})
