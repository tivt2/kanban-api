import { Router } from 'express';
import { get_auth_access_controller } from '../features/auth/auth-access/index.singletons';

export const api_router = Router();

api_router.use(async (req, res, next) => {
  await get_auth_access_controller().control(req, res, next);
});

api_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from api' });
});
