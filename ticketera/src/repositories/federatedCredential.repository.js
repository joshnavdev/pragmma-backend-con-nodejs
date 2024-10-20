import FederatedCredential from '../models/federateCredenia.model.js';
import BaseRepository from './repository.js';

class FederatedCredentialRepository extends BaseRepository {
  constructor() {
    super(FederatedCredential);
  }

  getOneByProviderAndProviderId(provider, providerId) {
    return this.model.findOne({ where: { provider, provider_id: providerId } });
  }
}

export default FederatedCredentialRepository;
