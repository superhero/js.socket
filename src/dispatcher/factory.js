const
Events      = require('events'),
Dispatcher  = require('.')

/**
 * Responsible for dispatching events from the payload stack
 */
class DispatcherFactory
{
  /**
   * @param {Logger} log
   * @param {EventsFactory} eventsFactory
   */
  constructor(log, eventsFactory)
  {
    this.log            = log
    this.eventsFactory  = eventsFactory
  }

  /**
   * @returns {Dispatcher}
   */
  create()
  {
    const events = this.eventsFactory.create()
    return new Dispatcher(this.log, events)
  }
}

module.exports = DispatcherFactory
