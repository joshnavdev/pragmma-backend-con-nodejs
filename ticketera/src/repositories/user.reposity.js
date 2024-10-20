import User from '../models/user.model.js';
import BaseRepository from './repository.js';

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async getOneByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}

export default UserRepository;
