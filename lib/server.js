module.exports = function Server(port, debug)
{
  if (this.constructor != Server)
    return new Server();

  const
  log     = require('@superhero/debug')({debug}),
  bus     = new class extends require('events') {},
  server  = new require('net').Server();

  ['close','connection','listening'].forEach((event) =>
    server.on(event, () => log('server', event)));

  server.on('error', (...a) => log('server error:', ...a));
  server.on('connection', (socket) =>
  {
    ['close','connection','drain','end','lookup','timeout'].forEach((event) =>
      socket.on(event, () => log('socket', event)));

    socket.on('error', (...a) => log('socket error:', ...a));
    socket.once('data', () => require('./domain/data')(bus, log, socket));
  });
  server.listen(config.port);

  // interface
  this.on = bus.on;
}
