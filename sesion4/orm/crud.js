import { Op } from 'sequelize';
import { Author } from './db.js';

export default async function crud() {
  // Crear un autor
  let author = new Author({ name: 'J.K. Rowling' });
  await author.save();

  author = Author.build({ name: 'George R.R. Martin' });
  await author.save();

  author = await Author.create({ name: 'Stephen King' });

  // Leer un autor
  let authors = await Author.findAll();

  authors = await Author.findAll({
    where: {
      name: 'Stephen King',
    },
  });

  // SELECT * FROM authors WHERE name LIKE '%Kin%';
  authors = await Author.findAll({
    where: {
      name: {
        [Op.like]: '%Kin%',
      },
    },
  });

  console.log(JSON.stringify(authors, null, 2));
}
