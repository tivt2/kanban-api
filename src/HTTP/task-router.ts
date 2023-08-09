import { Request, Response, Router } from 'express';

export const task_router = Router();

task_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from task' });
});

task_router.post('/', async (req, res) => {});

task_router.get('/', async (req, res) => {});

task_router.put('/:task_id', async (req, res) => {});

task_router.delete('/:task_id', async (req, res) => {});

task_router.use((error: Error, req: Request, res: Response) => {
  res.status(500);
  res.json({ message: error.message });
});
