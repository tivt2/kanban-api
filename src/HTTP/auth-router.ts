import { Router } from 'express';

export const auth_router = Router();

auth_router.get('/', (req, res) => {
  res.json({ message: 'Hi from auth' });
});

auth_router.post('/register');

auth_router.post('/login');

auth_router.post('/logout');

auth_router.post('/refresh');
