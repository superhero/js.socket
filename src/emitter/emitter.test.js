describe('Emitter', () =>
{
  const expect = require('chai').expect

  it('write buffer to socket', (done) =>
  {
    const
    Debug     = require('@superhero/debug'),
    log       = new Debug({ debug:false }),
    factory   = require('../../'),
    emitter   = factory.createEmitterFactory(log).create(),
    port      = 18200,
    netClient = require('net').createConnection({ port }),
    netServer = require('net').createServer().listen(port),
    buffer    = Buffer.from('foobar')

    netClient.on('connect', async () =>
    {
      await emitter.writeBufferToSocket(netClient, buffer)
    })

    netServer.on('connection', (socket) =>
    {
      socket.on('data', (data) =>
      {
        expect(data.toString()).to.be.equal(buffer.toString())
        socket.end()
        netServer.close()
      })
    })

    netServer.on('close', () => done())
  })

  it('emit event with data', (done) =>
  {
    const
    factory       = require('../../'),
    payloadStack  = factory.createPayloadStackFactory().create(),
    Debug         = require('@superhero/debug'),
    log           = new Debug({ debug:false }),
    emitter       = factory.createEmitterFactory(log).create(),
    port          = 18200,
    netClient     = require('net').createConnection({ port }),
    netServer     = require('net').createServer().listen(port),
    event         = 'foobar',
    body          = { foo:'bar' }

    netClient.on('connect', async () =>
    {
      await emitter.emit(netClient, event, body)
    })

    netServer.on('connection', (socket) =>
    {
      socket.on('data', (data) =>
      {
        payloadStack.push(data)
        const dto = payloadStack.shift()
        expect(dto.event).to.be.equal(event)
        expect(dto.data).to.deep.equal(body)
        socket.end()
        netServer.close()
      })
    })

    netServer.on('close', () => done())
  })
})
