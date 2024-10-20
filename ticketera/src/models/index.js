import { db } from '../utils/database.js';
import Comment from './comment.model.js';
import FederatedCredential from './federateCredenia.model.js';
import Ticket from './ticket.model.js';
import User from './user.model.js';

Ticket.init(db);
Comment.init(db);
User.init(db);
FederatedCredential.init(db);

Ticket.associate(db.models);
Comment.associate(db.models);
User.association(db.models);
FederatedCredential.associate(db.models);
