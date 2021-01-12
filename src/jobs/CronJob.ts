import Cron from 'node-cron';
import axios from 'axios';
import { getCustomRepository } from 'typeorm';
import PostsRepository from '../repositories/PostsRepository';
import CreatePostService from '../services/CreatePostService';

interface RedditResponse{
  data: {
    author_fullname: string;
    title: string;
    ups: number;
    num_comments: number;
  }
}

interface PostDTO{
  author: string;
  title: string;
  ups_count: number;
  comments_count: number;
}

/*
    explanation of function cron.schedule()
    * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | month
    | | | day of month
    | | hour
    | minute
    second
*/
let cron = Cron.schedule("* * * * *", async () => {
    try {
      let posts_reddit: PostDTO | any = [];
      const post_service = new CreatePostService();
      const post_repository = getCustomRepository(PostsRepository);

      const posts: any = await axios.get('https://api.reddit.com/r/artificial/hot');
      let posts_data = posts.data.data.children;
      posts_data.forEach((index:RedditResponse) => {
        posts_reddit.push({
          author: index.data.author_fullname,
          title: index.data.title,
          ups_count: index.data.ups,
          comments_count: index.data.num_comments
        });
      });

      let posts_created: PostDTO | any = [];
      let object_response = await post_repository.getNewPosts(posts_reddit);

      object_response.forEach(async index => {
        let response_service = await post_service.execute(index);
        if(response_service) posts_created.push(response_service);
      });

      console.log(posts_created);
    } catch (error) {
      console.error(error);
    }
});

export default cron;
