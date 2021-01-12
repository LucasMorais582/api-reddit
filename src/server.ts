import { response } from 'express';
import app from './app';
import CronJob from './jobs/CronJob';

app.use('/test-connection', (request, response) =>{
  return response.json("FALA MEU MANO.");
});

app.listen(3333, () => {
  CronJob.start();
  console.log('🚀 Server started on port 3333!');
});
