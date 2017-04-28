module.exports = function Server(port, debug)
{
  if (this.constructor != Server)
    return new Server(port, debug);

  const
  sockets = [],
  log     = require('@superhero/debug')({debug}),
  events  = new class extends require('events') {},
  server  = new require('net').Server();

  events.setMaxListeners(Infinity);

  ['close','connection','listening'].forEach((event) =>
    server.on(event, () => log('server', event)));

  server.on('error', (...a) => log('server error:', ...a));
  server.on('connection', (socket) =>
  {
    const id = (Date.now() + Math.random()).toString(36);
    sockets.push(id);

    ['close','connection','drain','end','lookup','timeout','data'].forEach(
      (event) => socket.on(event, () => log('socket', event)));

    socket.on('error', (...a) => log('socket error:', ...a));
    socket.on('end', () =>
    {
      sockets.splice(sockets.indexOf(id), 1);
      events.emit('socket.closed', id);
    });
    require('./data')(events, log, socket, id);
  });
  server.listen(port);

  // interface
  this.connected = (id) => !!~sockets.indexOf(id);
  this.on   = (...a) => events.on(...a);
  this.once = (e, obs, timeout) =>
  {
    events.once(e, obs);
    timeout && setTimeout(() => events.removeListener(e, obs), timeout);
  };
  this.removeListener     = (...a) => events.removeListener(...a);
  this.removeAllListeners = (...a) => events.removeAllListeners(...a);
}
