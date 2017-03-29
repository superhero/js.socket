module.exports = (bus, log, socket) =>
{
  const emit = (e,d) => socket.write(JSON.stringify({e,d}).concat('\0'));
  // first recieved header data...
  // set data listener for all the following requests
  let cache = Buffer.alloc(0);
  socket.on('data', (chunk) =>
  {
    // messages can come in multiple chunks that needs to be glued together
    // or in the same chunk that needs to be divided...
    cache = Buffer.concat([cache, chunk]);
    while(let i = cache.indexOf(0x00))
    {
      const msg = JSON.parse(cache.slice(0, i));
      cache = cache.slice(i+1);

      log('socket recieved:', msg);
      // e == event
      // d == data
      bus.emit(msg.e, {emit}, msg.d);
    }
  });
}
