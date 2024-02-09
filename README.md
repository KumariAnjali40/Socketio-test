# nodejs-socket-io

This is a POC for demonstrating the communication between express-nodejs server and the browser client.

## Dependencies

* Express ^4.16.3
* Socket.io ^2.0.4

**Client**  

Client uses [socket.io 2.0.4](https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js) from CDN


## Deployment

1. First, you need to install the dependencies of `nodejs`

        npm install

2. Load the `index.html` in the browser and open the developer console.

3. Run the `server.js`

        node server.js


Click on the `message` button and check the message both on the browser console and server

## LICENSE

MIT
