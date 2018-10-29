describe('Socket/Server', () =>
{
  const expect = require('chai').expect

  it('integration test between server and client', (done) =>
  {
    const
    Debug   = require('@superhero/debug'),
    log     = new Debug({ debug:false }),
    Server  = require('./server'),
    server  = Server.from(log),
    Client  = require('./client'),
    client  = Client.from(log),
    port    = 18200,
    event   = 'foobar',
    body    = { foo:'bar' }

    server.listen(port)
    client.connect(port)
    client.emit(event, body)

    server.on(event, (context, data) =>
    {
      expect(data).to.deep.equal(body)
      context.emit(event, body)
    })

    client.on(event, (context, data) =>
    {
      expect(data).to.deep.equal(body)
      client.client.end()
      server.server.close()
      done()
    })
  })

  it('possible to remove a listener', () =>
  {
    const
    Debug         = require('@superhero/debug'),
    log           = new Debug({ debug:false }),
    SocketServer  = require('./server'),
    socketServer  = SocketServer.from(log),
    event         = 'foobar',
    listener      = () => {}

    expect(socketServer.connectionObserver.dispatcher.events.listenerCount(event)).to.deep.equal(0)
    socketServer.on(event, listener)
    expect(socketServer.connectionObserver.dispatcher.events.listenerCount(event)).to.deep.equal(1)
    socketServer.removeListener(event, listener)
    expect(socketServer.connectionObserver.dispatcher.events.listenerCount(event)).to.deep.equal(0)
  })
})
