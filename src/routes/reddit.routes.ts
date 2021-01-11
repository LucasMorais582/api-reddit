import { Router } from 'express';
import axios from 'axios';

const redditRouter = Router();

redditRouter.get('/', async (request, response) => {
  try {
    const posts = await axios.get('https://api.reddit.com/r/artificial/hot');
    return response.json(posts.data);
  } catch (error) {
    console.error(error);
  }
});

export default redditRouter;
