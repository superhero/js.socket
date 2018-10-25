class SocketPayload
{
  constructor(event, data)
  {
    this.event  = event
    this.data   = data

    Object.freeze(this)
  }

  toStringifiedJson()
  {
    const
    event = this.event,
    data  = this.data

    return JSON.stringify({ event, data })
  }

  toBuffer()
  {
    const
    dto     = this.toStringifiedJson(),
    body    = Buffer.from(dto),
    header  = Buffer.alloc(SocketPayload.HEADER_SIZE)

    header.writeInt32BE(body.length, 0)

    return Buffer.concat([header, body])
  }
}

SocketPayload.HEADER_SIZE = 4

module.exports = SocketPayload
