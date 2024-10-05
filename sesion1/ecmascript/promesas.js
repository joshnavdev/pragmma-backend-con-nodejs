// Callbacks -> Asyncrona

// Emular una funciona sincrona que demore 3s
function readFileCb(success, callback) {
  // setTimeout(myLogica, El tiempo en milisegundos)
  setTimeout(() => {
    // Aqui va mi logica
    if (success) {
      // callback(error, data)
      callback(null, 'Exito');
    } else {
      callback('Error', null);
    }
  }, 3000);
}

console.log('Inicio');
readFileCb(false, (error, data) => {
  if (error) {
    // Logica en caso de que falle
    console.error(error);
  } else {
    // Logica en caso de que sea exitoso
    console.log(data);
  }
});

// Promesas
function readFilePromise(success) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve('Exito');
      } else {
        reject('Error');
      }
    }, 2000);
  });
}

// Promesa tiene 3 estados: Pendiente, Resuelta, Rechazada
console.log('Inicio');
console.log(readFilePromise(true));

// then y catch
readFilePromise(true)
  .then((data) => {
    // Logica en caso de que sea exitoso
    console.log(data);
    return 'Lo que quiera';
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

// Async - Await  -> Clean Code
async function runPromise() {
  try {
    const data = await readFilePromise(false);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

runPromise();
