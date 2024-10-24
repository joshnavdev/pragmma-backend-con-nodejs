/* eslint-disable no-unused-vars */

class EncryptionAdapter {
  hashPassword = async (password) => {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  };

  comparePassword = async (password, hash) => {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  };
}

export default EncryptionAdapter;
