import { Author, Biography, Book } from './db.js';

export default async function associations() {
  // Uno a uno
  let author = await Author.create({ name: 'J.K. Rowling' });

  let biography = await Biography.create({ text: 'J.K. Rowling is the author of Harry Potter.' });

  await author.setBiography(biography);

  // Leer author con biography

  author = await Author.findOne({
    where: { name: 'J.K. Rowling' },
    include: Biography,
  });

  console.log(JSON.stringify(author, null, 2));

  // biography = await author.getBiography();
  // console.log(JSON.stringify(biography, null, 2));

  // console.log(author.setBiography);
  // console.log(author.__proto__);
  // author.setBiography(biography);
  // Uno a muchos
}
