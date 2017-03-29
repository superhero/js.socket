module.exports = function Client(port, host, debug)
{
  if (this.constructor != Client)
    return new Client();

  const
  client = this,
  log    = require('@superhero/debug')({debug}),
  bus    = new class extends require('events') {},
  socket = new require('net').Socket();

  ['close','connect','drain','end','lookup','timeout'].forEach((event) =>
    socket.on(event, () => log('socket', event)));

  socket.on('error', (...a) => log('socket error:', ...a));
  socket.on('close', (...a) => socket.connect(port, host));
  socket.connect(port, host, () =>
  {
    log('socket connected');
    require('./data')(log, bus, socket);
  });

  this.on   = bus.on;
  this.emit = require('./emit')(socket);
}
