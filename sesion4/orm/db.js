import { DataTypes, Model, Sequelize } from 'sequelize';

const db = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'qwe123890',
  database: 'test',
  logging: false,
});

// Authors
class Author extends Model {}
Author.init({ name: { type: DataTypes.STRING } }, { sequelize: db, modelName: 'authors' });

class Biography extends Model {}
Biography.init({ text: { type: DataTypes.STRING } }, { sequelize: db, modelName: 'biographies' });

class Book extends Model {}
Book.init({ title: DataTypes.STRING }, { sequelize: db, modelName: 'books' });

// hasOne, hasMany, belongsTo, belongsToMany
Author.hasOne(Biography); // le agregar authorId a la tabla de biographies
Biography.belongsTo(Author);

export { db, Author, Biography, Book };
