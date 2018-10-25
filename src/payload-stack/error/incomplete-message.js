/**
 * @extends Error
 */
class IncompleteMessageError extends RangeError
{
  constructor(msg, ...a)
  {
    super(msg || 'payload stack has an incomplete message', ...a)
    this.code = 'ERR_INCOMPLETE_MESSAGE'
  }
}

module.exports = IncompleteMessageError
