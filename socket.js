const
Debug  = require('debug'),
Events = require('events')

class Socket
{
  constructor()
  {
    this.log    = new Debug({ prefix:'socket:' })
    this.events = new Events
  }

  onConnection(socket)
  {
    for(let event of ['close','connection','drain','end','lookup','timeout'])
      socket.on(event, () => this.log('connection:', event))

    for(let event of ['error'])
      socket.on(event, (...a) => this.log('connection:', event, ...a))

    const ctx   = { socket }
    ctx.emit    = this.emit.bind(this, socket)
    ctx.chunks  = []

    socket.on('data', this.onData .bind(this, ctx))
  }

  onData(ctx, data)
  {
    this.log('data')

    // messages can come in multiple chunks that needs to be glued together
    ctx.buffer = Buffer.concat([ctx.buffer, data].filter(_ => _))
    this.dispatch(ctx)
  }

  dispatch(ctx)
  {
    try
    {
      while(ctx.buffer.length)
      {
        const
        headerSize  = 10,
        dtoSize     = ctx.buffer.readUIntBE(0, headerSize),
        payloadSize = dtoSize + headerSize

        if(ctx.buffer.length < payloadSize)
          break

        const dto = ctx.buffer.slice(headerSize, payloadSize).toJSON()

        ctx.buffer = ctx.buffer.slice(payloadSize)
        this.events.emit(dto.event, ctx, dto.data)
      }
    }
    catch(error)
    {
      switch(error.code)
      {
        case 'ERR_OUT_OF_RANGE': break
        default: throw error
      }
    }
  }

  emit(socket, event, data)
  {
    this.log('emitting event:', event, 'data:', data)

    const
    dto     = JSON.stringify({ event, data }),
    body    = Buffer.from(dto),
    header  = Buffer.from(body.length),
    payload = Buffer.concat(header, body)

    return new Promise((fulfill, reject) =>
      socket.write(payload, (error) =>
      {
        if(error)
        {
          this.log('error emitting:', event, data, error)
          reject(error)
        }
        else
        {
          this.log('emitted:', event, data)
          fulfill()
        }
      }))
  }
}

module.exports = Socket
