const Payload = require('./payload-stack/payload')

/**
 * Responsible for emitting a message over the network
 */
class Emitter
{
  /**
   * @param {Logger} log
   */
  static from(log)
  {
    const createPayload = Payload.from
    return new Emitter(log, createPayload)
  }

  /**
   * @param {Logger} log
   * @param {Payload~from} createPayload
   */
  constructor(log, createPayload)
  {
    this.log            = log
    this.createPayload  = createPayload
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
      const payload = this.createPayload(event, data).toBuffer()
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
