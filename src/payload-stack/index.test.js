describe('Socket/PayloadStack', () =>
{
  const expect = require('chai').expect

  it('push and shift message from buffer stack', () =>
  {
    const
    SocketPayloadStack  = require('./index'),
    socketPayloadStack  = new SocketPayloadStack,
    foo                 = 'foobar',
    data                = { foo:'bar' },
    SocketPayload       = require('./payload'),
    socketPayload       = new SocketPayload(foo, data),
    buffer              = socketPayload.toBuffer()

    socketPayloadStack.push(buffer)
    const message = socketPayloadStack.shift()

    expect(message.event).to.be.equal(foo)
    expect(message.data).deep.equal(data)
    expect(socketPayloadStack.stack.length).to.be.equal(0)
  })

  it('shift a message from the buffer stack that holds a broken message', () =>
  {
    const
    SocketPayloadStack  = require('./index'),
    socketPayloadStack  = new SocketPayloadStack,
    event               = 'foobar',
    data                = { foo:'bar' },
    SocketPayload       = require('./payload'),
    socketPayload       = new SocketPayload(event, data),
    buffer              = socketPayload.toBuffer().slice(20),
    callback            = socketPayloadStack.shift.bind(socketPayloadStack)

    socketPayloadStack.push(buffer)

    expect(callback).to.throw(Error).with.property('code', 'ERR_INCOMPLETE_MESSAGE')
  })
})
