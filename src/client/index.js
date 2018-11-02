const Socket = require('../socket')

/**
 * When a server needs to connect with another, a client connection needs to be
 * esablished. This class is representing that client.
 *
 * @extends Socket
 */
class Client extends Socket
{
  /**
   * @param {Logger} log
   * @param {ConnectionObserver} connectionObserver
   * @param {net.Socket} client
   */
  constructor(log, connectionObserver, client)
  {
    super(log, connectionObserver)

    this.client = client
    this.logClientEvents(client, log)
  }

  /**
   * @param {number} port an unsigned integer
   * @param {string} host the host address to connect to
   */
  connect(port, host)
  {
    const
    observer  = this.connectionObserver,
    client    = this.client,
    callback  = observer.onConnection.bind(observer, client)

    this.client.connect(port, host, callback)
  }

  /**
   * @param {string} event
   * @param {*} data
   */
  async emit(...args)
  {
    const
    emitter = this.connectionObserver.emitter,
    client  = this.client

    await emitter.emit(client, ...args)
  }

  /**
   * @protected
   * @param {net.Socket} client
   * @param {Logger} log
   */
  logClientEvents(client, log)
  {
    ['close','connect','data','drain','end','error','lookup','ready','timeout']
    .forEach((event) => client.on(event, () => log.info(event)))

    client.on('error', (...a) => log.info('error', ...a))
  }
}

module.exports = Client
