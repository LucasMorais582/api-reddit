import { getCustomRepository } from 'typeorm';
import PostsRepository from '../repositories/PostsRepository';
import Post from '../models/Post';

interface Request {
  author: string;
  title: string;
  ups_count: number;
  comments_count: number;
}

class CreatePostService {
  public async execute({
    author,
    title,
    ups_count,
    comments_count,
  }: Request): Promise<Post | []> {
    try{
      const posts_repository = getCustomRepository(PostsRepository);
      const post = posts_repository.create({
        author,
        title,
        ups_count,
        comments_count,
      });

      await posts_repository.save(post);

      const post_response = {
        id: post.id,
        author,
        title,
        ups_count,
        comments_count,
        created_at: post.created_at,
        updated_at: post.updated_at,
        deleted_at: post.deleted_at,
      };

      return post_response;
    }catch(error){
      console.log(error);
      return [];
    }
  }
}

export default CreatePostService;
