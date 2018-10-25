describe('Socket/Server', () =>
{
  const expect = require('chai').expect

  it('integration test between server and client', (done) =>
  {
    const
    Debug         = require('@superhero/debug'),
    log           = new Debug({ debug:false }),
    SocketServer  = require('./server'),
    socketServer  = new SocketServer(log),
    SocketClient  = require('./client'),
    socketClient  = new SocketClient(log),
    port          = 18200,
    event         = 'foobar',
    body          = { foo:'bar' }

    socketServer.listen(port)
    socketClient.connect(port)

    socketClient.emit(event, body)

    socketServer.on(event, (context, data) =>
    {
      expect(data).to.deep.equal(body)
      context.emit(event, body)
    })

    socketClient.on(event, (context, data) =>
    {
      expect(data).to.deep.equal(body)
      socketClient.client.end()
      socketServer.server.close()
      done()
    })
  })
})
