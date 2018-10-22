/**
 * @extends Error
 */
class IncompleteMessageError extends Error
{
  constructor(msg, ...a)
  {
    super(msg || 'Buffer has incomplete messages in stack', ...a)
    this.code = 'ERR_INCOMPLETE_MESSAGE'
  }
}

module.exports = IncompleteMessageError
