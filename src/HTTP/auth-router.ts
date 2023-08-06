import { Router } from 'express';
import { get_register_user_controller } from '../features/auth/register/register-user.singletons';

export const auth_router = Router();

auth_router.get('/', (req, res) => {
  res.json({ message: 'Hi from auth' });
});

auth_router.post('/register', get_register_user_controller().control);

auth_router.post('/login');

auth_router.post('/logout');

auth_router.post('/refresh');
