module.exports = function Client(port, host, debug)
{
  if (this.constructor != Client)
    return new Client(port, host, debug);

  const
  client = this,
  log    = require('@superhero/debug')({debug}),
  events = new class extends require('events') {},
  socket = new require('net').Socket();

  events.setMaxListeners(100);
  socket.setMaxListeners(100);

  ['close','connect','drain','end','lookup','timeout','data'].forEach(
    (event) => socket.on(event, () => log('socket', event)));

  socket.on('error', (...a) => log('socket error:', ...a));
  socket.on('close', (...a) => setTimeout(() => socket.connect(port, host), 1e3));
  socket.connect(port, host, () =>
  {
    log('socket connected');
    require('./data')(events, log, socket);
  });

    // interface
  this.emit = require('./emit')(socket);
  this.on   = (...a) => events.on(...a);
  this.once = (e, obs, timeout) =>
  {
    events.once(e, obs);
    timeout && setTimeout(() => events.removeListener(e, obs), timeout);
  };
}
