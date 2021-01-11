import { Router } from 'express';
import { getRepository, Between } from 'typeorm';
import Post from '../models/Post';


const postsRouter = Router();

postsRouter.get('/period', async (request, response) => {
  const postsRepository = getRepository(Post);

  let posts;
  let ordenation_mode = request.query.order;
  let initial_date = request.query.initial_date ? request.query.initial_date: null;
  let final_date = request.query.final_date ? request.query.final_date: null;

  if(initial_date && final_date){
    if(ordenation_mode === 'ups')
    posts = await postsRepository.find({
      order:{
        ups_count: 'DESC',
      },
      where: [ {'created_at': Between(initial_date, final_date)}],
    });

    else if(ordenation_mode === 'comments')
      posts = await postsRepository.find({
        order:{
          comments_count: 'DESC',
        },
        where: [ {'created_at': Between(initial_date, final_date)}],
      });

    else{
      posts = await postsRepository.find({
        where: [ {'created_at': Between(initial_date, final_date)}],
      });
    }
  }
  return response.json(posts);
});

postsRouter.get('/users', async (request, response) => {
  const postsRepository = getRepository(Post);
  let users;
  let ordenation_mode = request.query.order;

  if(ordenation_mode === 'ups')
    users = await postsRepository.find({
      select: ['author'],
      order:{
        ups_count: 'DESC',
      }
    });

  else if(ordenation_mode === 'comments')
    users = await postsRepository.find({
      select: ['author'],
      order:{
        comments_count: 'DESC',
      }
    });

  else{
    users = await postsRepository.find({
      select: ['author']
    });
  }

  return response.json(users);
});

export default postsRouter;
