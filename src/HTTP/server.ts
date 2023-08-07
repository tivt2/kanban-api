import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { auth_router } from './auth-router';
import { api_router } from './api-router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

app.get('/', (_, res) => {
  res.json({ message: 'Hello from server' });
});

app.use('/auth', auth_router);

app.use('/api', api_router);

app.use((err: Error, req: Request, res: Response) => {
  console.log('Unexpected error: ', err);
  res.status(500);
  res.json({
    message: 'Something wrong happend, please try again in a moment',
  });
});

export default app;
