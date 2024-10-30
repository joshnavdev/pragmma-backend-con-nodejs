# BASE -> corre en ubuntu, en linux, o algun otra imagen especifica
FROM node:20-alpine

WORKDIR /app

# INSTANLACION DE LAS DEPENCIAS -> Instando node para poder correr el proyecto
COPY package.json .

RUN npm install --omit=dev

# COPY -> Copi todo mi proyecto a la imagen
# COPIA TODO MI PROYECTO
COPY . .


# COMMAND -> COMO EJECUTO MI PROYECTO
CMD  ["npm", "run", "start"]