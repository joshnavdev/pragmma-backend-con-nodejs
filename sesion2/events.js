import EventEmitter from 'events';

// class PedidosEventEmitter extends EventEmitter {
//   constructor() {
//     super();
//   }
// }

// const pedidosApp = new PedidosEventEmitter();

// pedidosApp.on('nuevoPedido', () => {
//   console.log('Se ha recibido un nuevo pedido');
// });

// pedidosApp.on('nuevoPedido', (pedido) => {
//   console.log(`Pedido: ${pedido.pedido}`);
//   console.log(`Cantidad: ${pedido.cantidad}`);
// });

// pedidosApp.on('nuevoPedido', () => {
//   console.log('actualizar stock');
// });

// pedidosApp.emit('nuevoPedido', { pedido: 'Pizza', cantidad: 2 });
// pedidosApp.emit('nuevoPedido', { pedido: 'Rolls', cantidad: 6 });

import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
  res.end('Hello World\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Escuchando...');
});
