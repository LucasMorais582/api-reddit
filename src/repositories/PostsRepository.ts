/* eslint-disable func-names */
import { EntityRepository, Repository, Not } from 'typeorm';
import Post from '../models/Post';

interface PostDTO{
    author: string;
    title: string;
    ups_count: number;
    comments_count: number;
}

@EntityRepository(Post)
class PostsRepository extends Repository<Post> {
  public async getNewPosts(PostsReddit:PostDTO[]): Promise<PostDTO[]> {
    try{
      let posts_reddit = PostsReddit;
      let attributes_find: any = [];
      posts_reddit.forEach(index =>{
        attributes_find.push({ author: index.author, title: index.title });
      });
      const posts_database = await this.find({
        select: ['author', 'title', 'comments_count', 'ups_count'],
        where: attributes_find
      });

      let posts_concated:any = posts_reddit.concat(posts_database);

      let new_posts:any = [];
      posts_concated.forEach((item:any) => {
        let duplicated  = new_posts.findIndex((redItem:any) => {
            return (item.author == redItem.author && item.title == redItem.title);
        }) > -1;

        if(!duplicated) {
            new_posts.push(item);
        }
        else{
          let element_delete = new_posts.findIndex((index:any) =>{
            return (item.author == index.author && item.title == index.title);
          });
          new_posts.splice(element_delete, 1);
        }
      });

      return new_posts;
    }catch(error){
      console.log(error);
      return [];
    }

  }
}

export default PostsRepository;
