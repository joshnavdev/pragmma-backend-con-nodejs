import fs from 'fs';
import crypto from 'crypto';
import config from './utils/config.js';

// const tickets = JSON.parse(fs.readFileSync(DB_PATH));

const generateUUID = () => {
  return crypto.randomBytes(16).toString('hex');
};

const _read = async () => {
  const content = await fs.promises.readFile(config.dbPath);
  return JSON.parse(content);
};

const _write = async (data) => {
  await fs.promises.writeFile(config.dbPath, JSON.stringify(data, null, 2));
};

// getAll
const getAll = async () => {
  const tickets = await _read();

  return Object.keys(tickets).map((key) => {
    return {
      ...tickets[key],
    };
  });
};

// create
const create = async (item) => {
  const data = await _read();

  const id = generateUUID();
  const newItem = { id, ...item };

  data[id] = newItem;

  await _write(data);

  return newItem;
};

// getById
const getById = async (id) => {
  const data = await _read();

  return data[id] || null; // -> 1231231321
};

// updateById
const updateById = async (id, newItem) => {
  const data = await _read();
  const item = data[id];

  if (!item) {
    throw new Error('DB: Item not found');
  }

  data[id] = { ...item, ...newItem };

  await _write(data);

  return data[id];
};

// deleteById
const deleteById = async (id) => {
  const data = await _read();
  const item = data[id];

  if (!item) {
    throw new Error('DB: Item not found');
  }

  delete data[id];

  await _write(data);
};

export default {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
