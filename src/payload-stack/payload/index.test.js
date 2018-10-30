describe('Payload', () =>
{
  const expect = require('chai').expect

  it('is mutable', () =>
  {
    const
    event   = 'foobar',
    data    = { foo:'bar' },
    Payload = require('./index'),
    payload = Payload.from(event, data)

    payload.event = 'barbaz'

    expect(payload.event).to.be.equal(event)
  })

  it('can be represented as a buffer', () =>
  {
    const
    event   = 'foobar',
    data    = { foo:'bar' },
    Payload = require('./index'),
    payload = Payload.from(event, data)

    payload.event = 'barbaz'

    expect(payload.toBuffer.bind(payload)).to.not.throw()
  })

  it('buffer has a header that describes the correct length of the buffer', () =>
  {
    const
    event   = 'foobar',
    data    = { foo:'bar' },
    Payload = require('./index'),
    payload = Payload.from(event, data),
    buffer  = payload.toBuffer(),
    length  = buffer.readInt32BE(0)

    expect(Payload.HEADER_SIZE + length).to.be.equal(buffer.length)
  })
})
