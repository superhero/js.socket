/**
 * Error message thrown when a payload holds a partial message
 * @extends RangeError
 */
class IncompleteMessageError extends RangeError
{
  /**
   * @param {string} msg [optional]
   */
  constructor(msg = 'payload stack has an incomplete message', ...a)
  {
    super(msg, ...a)
    this.code = 'ERR_INCOMPLETE_MESSAGE'
  }
}

module.exports = IncompleteMessageError
