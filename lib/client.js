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
    socket.on(event, () => log('client', event)));

  socket.on('error', (...a) => log('client error:', ...a));
  socket.connect(port, host, () =>
  {
    log('client connected');
    require('./domain/data')(log, bus, socket);
  });

  this.on   = bus.on;
  this.emit = (e, d) => socket.connecting
  ? socket.on('connect', () => client.emit(e, d))
  : socket.write(JSON.stringify({e,d}));
}
