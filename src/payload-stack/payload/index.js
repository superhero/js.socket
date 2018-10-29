/**
 * Represent a package of data to send over the network
 */
class Payload
{
  /**
   * @param {string} event
   * @param {*} data
   */
  static from(event, data)
  {
    return new Payload(event, data)
  }

  /**
   * @param {string} event
   * @param {*} data
   */
  constructor(event, data)
  {
    this.event  = event
    this.data   = data

    Object.freeze(this)
  }

  /**
   * @returns {string} Stringified JSON
   */
  toStringifiedJson()
  {
    const
    event = this.event,
    data  = this.data

    return JSON.stringify({ event, data })
  }

  /**
   * Composes a binary package with a header and body
   * @returns {Buffer}
   */
  toBuffer()
  {
    const
    dto     = this.toStringifiedJson(),
    body    = Buffer.from(dto),
    header  = Buffer.alloc(Payload.HEADER_SIZE)

    header.writeInt32BE(body.length, 0)

    return Buffer.concat([header, body])
  }
}

/**
 * The byte size of the header
 * @const
 */
Payload.HEADER_SIZE = 4

module.exports = Object.freeze(Payload)
