import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { auth_router } from './auth-router';
import { api_router } from './api-router';
import { server_error_catcher_middleware } from './middleware/server-error-catcher';

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

app.use(server_error_catcher_middleware('server'));

export default app;
