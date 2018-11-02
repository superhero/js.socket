describe('PayloadStack', () =>
{
  const expect = require('chai').expect

  it('push and shift message from buffer stack', () =>
  {
    const
    factory       = require('../../'),
    payloadStack  = factory.createPayloadStackFactory().create(),
    foo           = 'foobar',
    data          = { foo:'bar' },
    payload       = factory.createPayloadFactory().create(foo, data),
    buffer        = payload.toBuffer()

    payloadStack.push(buffer)
    const message = payloadStack.shift()

    expect(message.event).to.be.equal(foo)
    expect(message.data).deep.equal(data)
    expect(payloadStack.stack.length).to.be.equal(0)
  })

  it('shift a message from the buffer stack that holds a broken message', () =>
  {
    const
    factory       = require('../../'),
    payloadStack  = factory.createPayloadStackFactory().create(),
    event         = 'foobar',
    data          = { foo:'bar' },
    payload       = factory.createPayloadFactory().create(event, data),
    buffer        = payload.toBuffer().slice(20),
    callback      = payloadStack.shift.bind(payloadStack)

    payloadStack.push(buffer)

    expect(callback).to.throw(Error).with.property('code', 'ERR_INCOMPLETE_MESSAGE')
  })
})
