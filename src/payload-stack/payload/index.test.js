describe('Socket/PayloadStack/Payload', () =>
{
  const expect = require('chai').expect

  it('is mutable', () =>
  {
    const
    event = 'foobar',
    data  = { foo:'bar' },
    SocketPayload = require('./index'),
    socketPayload = new SocketPayload(event, data)

    socketPayload.event = 'barbaz'

    expect(socketPayload.event).to.be.equal(event)
  })

  it('can be represented as a buffer', () =>
  {
    const
    event = 'foobar',
    data  = { foo:'bar' },
    SocketPayload = require('./index'),
    socketPayload = new SocketPayload(event, data)

    socketPayload.event = 'barbaz'

    expect(socketPayload.toBuffer.bind(socketPayload)).to.not.throw()
  })

  it('buffer has a header that describes the correct length of the buffer', () =>
  {
    const
    event = 'foobar',
    data  = { foo:'bar' },
    SocketPayload = require('./index'),
    socketPayload = new SocketPayload(event, data),
    buffer = socketPayload.toBuffer(),
    length = buffer.readInt32BE(0)

    expect(SocketPayload.HEADER_SIZE + length).to.be.equal(buffer.length)
  })
})
