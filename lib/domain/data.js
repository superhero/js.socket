module.exports = (events, log, socket, id) =>
{
  const emit = require('./emit')(socket);

  // cache inclomplete segments...
  let cache = Buffer.alloc(0);
  socket.on('data', (chunk) =>
  {
    // messages can come in multiple chunks that needs to be glued together
    // or in the same chunk that needs to be divided...
    cache = Buffer.concat([cache, chunk]);
    for(let i = cache.indexOf('\0'); ~i; i = cache.indexOf('\0'))
    {
      const s = cache.slice(0, i).toString();
      cache = cache.slice(i+1);

      try
      {
        const msg = JSON.parse(s);
        log('socket recieved:', msg);

        // e == event
        // d == data
        setImmediate(() => events.emit(msg.e, {id, emit}, msg.d));
      }
      catch (e)
      {
        log('socket error, could not parse message:', s.length, s);
      }
    }
  });
}
