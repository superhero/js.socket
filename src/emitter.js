const SocketPayload = require('./payload-stack/payload')

class SocketEmitter
{
  constructor(log)
  {
    this.log = log
  }

  async emit(socket, event, data)
  {
    this.log.info('emitting event:', event, 'data:', data)

    try
    {
      const payload = new SocketPayload(event, data).toBuffer()
      await this.writeBufferToSocket(socket, payload)
    }
    catch(error)
    {
      this.log.info('error emitting:', event, data, error)
      throw error
    }

    this.log.info('emitted:', event, data)
  }

  /**
   * @protected
   */
  writeBufferToSocket(socket, buffer)
  {
    return new Promise(
      (accept, reject) =>
        socket.write(
          buffer,
          (error) => error
            ? reject(error)
            : accept()))
  }
}

module.exports = SocketEmitter
