describe('Dispatcher', () =>
{
  const expect = require('chai').expect

  it('handle error', () =>
  {
    const
    Debug                   = require('@superhero/debug'),
    log                     = new Debug({ debug:false }),
    Dispatcher              = require('./dispatcher'),
    dispatcher              = Dispatcher.from(log),
    IncompleteMessageError  = require('./payload-stack/error/incomplete-message'),
    incompleteMessageError  = new IncompleteMessageError,
    error                   = new Error,
    callbackThrows          = dispatcher.handleError.bind(dispatcher, error),
    callbackDoesNotThrow    = dispatcher.handleError.bind(dispatcher, incompleteMessageError)

    expect(callbackThrows).to.throw()
    expect(callbackDoesNotThrow).to.not.throw()
  })

  it('loop through context buffer to dispatch each message one by one', (done) =>
  {
    const
    Debug       = require('@superhero/debug'),
    log         = new Debug({ debug:false }),
    Dispatcher  = require('./dispatcher'),
    dispatcher  = Dispatcher.from(log),
    Payload     = require('./payload-stack/payload'),
    event       = 'foobar',
    body        = { foo:'bar' },
    buffer      = Payload.from(event, body).toBuffer(),
    Emitter     = require('./emitter'),
    emitter     = Emitter.from(log),
    port        = 18200,
    netClient   = require('net').createConnection({ port }),
    netServer   = require('net').createServer().listen(port),
    Context     = require('./context'),
    context     = Context.from(netClient, emitter)

    context.payloadStack.push(buffer, buffer)

    netClient.on('connect', () => dispatcher.loopThroughContextBufferToDispatchEachMessageOneByOne(context))

    let i = 0
    dispatcher.events.on(event, (context, data) =>
    {
      if(++i === 2)
      {
        expect(data).to.deep.equal(body)
        netClient.end()
        netServer.close()
        done()
      }
    })
  })
})
