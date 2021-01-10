import express from 'express';
import createConnection from './database';

createConnection();
const app = express();

app.use(express.json());

export default app;
