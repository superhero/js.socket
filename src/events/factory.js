const Events = require('events')

class EventsFactory
{
  /**
   * @returns {events}
   */
  create()
  {
    return new Events
  }
}

module.exports = EventsFactory
