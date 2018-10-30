describe('PayloadStack', () =>
{
  const expect = require('chai').expect

  it('push and shift message from buffer stack', () =>
  {
    const
    PayloadStack  = require('./index'),
    payloadStack  = PayloadStack.from(),
    foo           = 'foobar',
    data          = { foo:'bar' },
    Payload       = require('./payload'),
    payload       = Payload.from(foo, data),
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
    PayloadStack  = require('./index'),
    payloadStack  = PayloadStack.from(),
    event         = 'foobar',
    data          = { foo:'bar' },
    Payload       = require('./payload'),
    payload       = Payload.from(event, data),
    buffer        = payload.toBuffer().slice(20),
    callback      = payloadStack.shift.bind(payloadStack)

    payloadStack.push(buffer)

    expect(callback).to.throw(Error).with.property('code', 'ERR_INCOMPLETE_MESSAGE')
  })
})
