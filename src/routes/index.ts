import { Router } from 'express';
import postRouter from './posts.routes';
import redditRouter from './reddit.routes';

const routes = Router();

routes.use('/reddit', redditRouter);
routes.use('/posts', postRouter);

export default routes;
