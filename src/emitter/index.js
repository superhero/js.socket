/**
 * Responsible for emitting a message over the network
 */
class Emitter
{
  /**
   * @param {Logger} log
   * @param {PayloadFactory} payloadFactory
   */
  constructor(log, payloadFactory)
  {
    this.log            = log
    this.payloadFactory = payloadFactory
  }

  /**
   * @param {net.Socket} socket
   * @param {events} event
   * @param {*} data
   */
  async emit(socket, event, data)
  {
    this.log.info('emitting event:', event, 'data:', data)

    try
    {
      const payload = this.payloadFactory.create(event, data).toBuffer()
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
   * @param {net.Socket} socket
   * @param {Buffer} buffer
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

module.exports = Emitter
