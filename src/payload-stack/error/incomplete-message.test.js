describe('Payload/Error/IncompleteMessage', () =>
{
  const expect = require('chai').expect

  it('is of expected type', () =>
  {
    const
    IncompleteMessageError = require('./incomplete-message'),
    error = new IncompleteMessageError

    expect(error).to.be.an.instanceof(Error)
  })

  it('has expected error code', () =>
  {
    const
    IncompleteMessageError = require('./incomplete-message'),
    error = new IncompleteMessageError

    expect(error.code).to.be.equal('ERR_INCOMPLETE_MESSAGE')
  })
})
