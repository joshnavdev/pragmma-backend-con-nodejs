import bcrypt from 'bcrypt';
import EncryptionAdapter from './encryption.adapter.js';

class BcryptAdapter extends EncryptionAdapter {
  hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
  };

  comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
  };
}

export default BcryptAdapter;
