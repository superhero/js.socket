module.exports = function Client(port, host, debug)
{
  if (this.constructor != Client)
    return new Client(port, host, debug);

  const
  client = this,
  log    = require('@superhero/debug')({debug}),
  events = new class extends require('events') {},
  socket = new require('net').Socket();

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
  this.on   = (...a) => events.on(...a);
  this.emit = require('./emit')(socket);
}
