const emit = module.exports = (socket) => (e,d) =>
  socket.connecting
  ? socket.on('connect', () => emit(socket)(e, d))
  :!socket.destroyed && socket.write(JSON.stringify({e,d}).concat('\0'));
