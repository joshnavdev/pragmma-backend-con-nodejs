import Comment from '../models/comment.model.js';
import BaseRepository from './repository.js';

class CommentRepository extends BaseRepository {
  constructor() {
    super(Comment);
  }
}

export default CommentRepository;
