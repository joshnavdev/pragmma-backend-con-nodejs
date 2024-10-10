import fs from 'fs';
import http from 'http';

const server = http.createServer();

// Creamos un archivo grande
// for (let i = 0; i < 100000; i++) {
//   fs.appendFileSync('test-file.txt', 'Curso de Backend con NodeJS\n');
// }

server.on('request', (req, res) => {
  // solucion 1: mala
  // fs.readFile('test-file.txt', (error, data) => {
  //   if (error) console.log(error);

  //   res.end(data);
  // });

  // Solucion 2: Streams
  const readStream = fs.createReadStream('test-file.txt');

  // readStream.on('data', (chunk) => {
  //   res.write(chunk);
  // });

  // readStream.on('end', () => {
  //   res.end();
  // });

  // Solucion 3

  readStream.pipe(res);
});

server.listen(3000, '127.0.0.1', () => {
  console.log('escuchando...');
});
