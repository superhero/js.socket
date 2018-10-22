class SocketEmitter
{
  constructor(log)
  {
    this.log = log
  }

  async emit(socket, event, data)
  {
    this.log('emitting event:', event, 'data:', data)

    try
    {
      const payload = this.composePayload(event, data)
      await writePayloadToSocket(socket, payload)
    }
    catch(error)
    {
      this.log('error emitting:', event, data, error)
      throw error
    }

    this.log('emitted:', event, data)
  }

  /**
   * @protected
   */
  composePayload(event, data)
  {
    const
    dto     = JSON.stringify({ event, data }),
    body    = Buffer.from(dto),
    header  = Buffer.from(body.length),
    payload = Buffer.concat(header, body)

    return payload
  }

  /**
   * @protected
   */
  async writePayloadToSocket(socket, payload)
  {
    const promisifiedSocketWrite = this.createPromisifiedSocketWrite(socket)
    await promisifiedSocketWrite(payload)
  }

  /**
   * @protected
   */
  createPromisifiedSocketWrite(socket)
  {
    const
    socketWrite             = socket.write.bind(socket),
    promisifiedSocketWrite  = require('util').promisify(socketWrite)

    return promisifiedSocketWrite
  }
}

module.exports = SocketEmitter
