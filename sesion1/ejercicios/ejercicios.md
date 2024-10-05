# Problemas

## 1. Uso de Promesas y async/await

### Problema:

Dado tres funciones asyncronas que simular llamadas a base de datos, realiza una cadena de operaciones asincronas usando promesas `then` y `catch`. Luego realizar la misma logica pero usando `async-await`. Recuerda imprimer la informacion en de cada respuesta.

```js
function obtenerUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuarios = { 1: 'Ana', 2: 'Luis', 3: 'Carlos' };
      usuarios[id] ? resolve({ id, nombre: usuarios[id] }) : reject('Usuario no encontrado');
    }, 1000);
  });
}

function obtenerPosts(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts = { 1: ['Post 1', 'Post 2'], 2: ['Post 3'], 3: [] };
      resolve(posts[idUsuario] || []);
    }, 1000);
  });
}

function obtenerComentarios(post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comentarios = { 'Post 1': ['Comentario 1'], 'Post 2': ['Comentario 2'], 'Post 3': [] };
      resolve(comentarios[post] || []);
    }, 1000);
  });
}
```

### Objetivo

Que los alumnos comprendan cómo manejar asincronía de una manera más limpia y moderna con ES6.

### Pistas:

- Para las cadena de operaciones utilizar el `return` en el methodo `then`.
- Recuerda que al retornar una promesa el resultado (exitoso) pasaria a la siguiente cadena `then`.
- Recuerda usar el catch para el manejo de error.

## 2. Event Loop y Operaciones Asíncronas

### Problema:

Crear un script en Node.js que simule un servidor HTTP básico. El servidor debe procesar varias solicitudes simultáneamente, pero debe simular una operación de entrada/salida que tarde unos segundos (usando setTimeout).

### Objetivo:

Que los alumnos vean cómo el Event Loop no bloquea otras solicitudes mientras espera que finalice una operación asincrónica.

### Pistas:

- Usar el módulo http para manejar las solicitudes [documentacion](https://nodejs.org/api/http.html#http).
- Usar setTimeout() para simular una operación que toma tiempo.
- Podrias usar el endpoint /slow para simular una llamada que consuma n segundos


## 3. Crear una API RESTful simple con Node.js

### Problema:

Crear una API RESTful simple con Node.js sin usar ningún framework como Express. La API debe tener dos endpoints:

- GET /tasks: Devuelve una lista de tareas.
- POST /tasks: Agrega una nueva tarea a la lista.

### Objetivo:

Practicar el manejo de solicitudes HTTP, el manejo de datos y las respuestas en formato JSON.

### Pistas:

- Usar el módulo `http` para crear el servidor.
- Almacenar los usuarios en un array en memoria.
- Un ejemplo de una tarea `{ "id": 1, "title": "Estudiar NodeJS" }`
