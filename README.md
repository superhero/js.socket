# Socket

Licence: [MIT](https://opensource.org/licenses/MIT)

---

[![npm version](https://badge.fury.io/js/%40superhero%2Fsocket.svg)](https://badge.fury.io/js/%40superhero%2Fsocket)

A socket connection for "server to server" communication.

## Install

`npm install @superhero/socket`

...or just set the dependency in your `package.json` file:

```json
{
  "dependencies":
  {
    "@superhero/socket": "*"
  }
}
```

## Example Application

A simple example to get started follows.

```js
const
Debug         = require('@superhero/debug'),
SocketServer  = require('./server'),
SocketClient  = require('./client'),
// log        = console,
log           = new Debug({ debug:true }),
socketServer  = new SocketServer(log),
socketClient  = new SocketClient(log),
port          = 18200,
event         = 'foobar',
body          = { foo:'bar' }

socketServer.listen(port)
socketClient.connect(port)

socketClient.emit(event, body)
socketServer.on(event, (context, data) => context.emit(event, body))
socketClient.on(event, (context, data) =>
{
  // if you need to close the connection, then...
  socketClient.client.end()
  socketServer.server.close()
})
```
