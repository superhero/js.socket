const
NetClient         = require('net').Socket,
SocketConnection  = require('./connection')

class SocketClient
{
  constructor(log)
  {
    this.log        = log
    this.connection = new SocketConnection(log, this)
    this.client     = new NetClient(
    {
      readable: true,
      writable: true
    })

    this.logClientEvents(this.client, log)
  }

  connect(port, host)
  {
    const
    connection  = this.connection,
    client      = this.client,
    callback    = connection.onConnection.bind(connection, client)

    this.client.connect(port, host, callback)
  }

  async emit(...args)
  {
    const
    emitter = this.connection.emitter,
    client  = this.client

    await emitter.emit(client, ...args)
  }

  on(...args)
  {
    this.connection.dispatcher.events.on(...args)
  }

  once(...args)
  {
    this.connection.dispatcher.events.once(...args)
  }

  /**
   * @protected
   */
  logClientEvents(client, log)
  {
    for(let event of ['close','connection','listening'])
      client.on(event, () => log.info(event))

    for(let event of ['error'])
      client.on(event, (...a) => log.info(event, ...a))
  }
}

module.exports = SocketClient
