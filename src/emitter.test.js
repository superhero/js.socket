describe('Socket/Emitter', () =>
{
  const expect = require('chai').expect

  it('write buffer to socket', (done) =>
  {
    const
    Debug         = require('@superhero/debug'),
    log           = new Debug({ debug:false }),
    SocketEmitter = require('./emitter'),
    socketEmitter = new SocketEmitter(log),
    port          = 18200,
    netClient     = require('net').createConnection({ port }),
    netServer     = require('net').createServer().listen(port),
    buffer        = Buffer.from('foobar')

    netClient.on('connect', async () =>
    {
      await socketEmitter.writeBufferToSocket(netClient, buffer)
    })

    netServer.on('connection', (socket) => socket.on('data', (data) =>
    {
      expect(data.toString()).to.be.equal(buffer.toString())
      socket.end()
      netServer.close()
    }))

    netServer.on('close', () => done())
  })

  it('emit event with data', (done) =>
  {
    const
    SocketPayloadStack  = require('./payload-stack'),
    socketPayloadStack  = new SocketPayloadStack,
    Debug               = require('@superhero/debug'),
    log                 = new Debug({ debug:false }),
    SocketEmitter       = require('./emitter'),
    socketEmitter       = new SocketEmitter(log),
    port                = 18200,
    netClient           = require('net').createConnection({ port }),
    netServer           = require('net').createServer().listen(port),
    event               = 'foobar',
    body                = { foo:'bar' }

    netClient.on('connect', async () =>
    {
      await socketEmitter.emit(netClient, event, body)
    })

    netServer.on('connection', (socket) =>
    {
      socket.on('data', (data) =>
      {
        socketPayloadStack.push(data)
        const dto = socketPayloadStack.shift()
        expect(dto.event).to.be.equal(event)
        expect(dto.data).to.deep.equal(body)
        socket.end()
        netServer.close()
      })
    })

    netServer.on('close', () => done())
  })
})
