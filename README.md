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
SocketFactory = require('@superhero/socket'),
socketFactory = new SocketFactory,
// Debug      = require('@superhero/debug'),
// log        = new Debug({ debug:true }),
log           = console,
server        = socket.createServer(log),
client        = socket.createClient(log),
port          = 18200,
event         = 'foobar',
body          = { foo:'bar' }

server.listen(port)
client.connect(port)

client.emit(event, body)
server.on(event, (context, data) => context.emit(event, body))
client.on(event, (context, data) =>
{
  // if you need to close the connection, then...
  client.client.end()
  server.server.close()
})
```
