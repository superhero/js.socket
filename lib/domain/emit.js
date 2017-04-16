const emit = module.exports = (socket) => (e,d) =>
  socket.connecting || socket.destroyed
  ? socket.once('connect', () => emit(socket)(e, d))
  : socket.write(JSON.stringify({e,d}).concat('\0'));
