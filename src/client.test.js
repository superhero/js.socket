describe('Socket/Client', () =>
{
  const expect = require('chai').expect

  it('integration test between client and server', (done) =>
  {
    const
    Debug         = require('@superhero/debug'),
    log           = new Debug({ debug:true }),
    SocketServer  = require('./server'),
    socketServer  = SocketServer.from(log),
    SocketClient  = require('./client'),
    socketClient  = SocketClient.from(log),
    port          = 18200,
    event         = 'foobar',
    body          = { foo:'bar' }

    socketServer.listen(port)
    socketClient.connect(port)
    socketClient.emit(event, body)
    socketServer.on(event, (context, data) =>
    {
      expect(data).to.deep.equal(body)
      socketClient.client.end()
      socketServer.server.close()
      done()
    })
  })

  it('possible to remove a listener', () =>
  {
    const
    Debug         = require('@superhero/debug'),
    log           = new Debug({ debug:false }),
    SocketClient  = require('./client'),
    socketClient  = SocketClient.from(log),
    event         = 'foobar',
    listener      = () => {}

    expect(socketClient.connectionObserver.dispatcher.events.listenerCount(event)).to.deep.equal(0)
    socketClient.on(event, listener)
    expect(socketClient.connectionObserver.dispatcher.events.listenerCount(event)).to.deep.equal(1)
    socketClient.removeListener(event, listener)
    expect(socketClient.connectionObserver.dispatcher.events.listenerCount(event)).to.deep.equal(0)
  })
})
