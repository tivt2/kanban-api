import { Request, Response, Router } from 'express';
import { get_create_task_controller } from '../features/task/create-task/index.singletons';
import { get_get_tasks_controller } from '../features/task/get-tasks/index.singletons';
import { get_edit_task_controller } from '../features/task/edit-task/index.singletons';
import { get_delete_task_controller } from '../features/task/delete-task/index.singletons';

export const task_router = Router();

task_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from task' });
});

task_router.post('/', async (req, res) => {
  await get_create_task_controller().control(req, res);
});

task_router.get('/', async (req, res) => {
  await get_get_tasks_controller().control(req, res);
});

task_router.put('/:task_id', async (req, res) => {
  await get_edit_task_controller().control(req, res);
});

task_router.delete('/:task_id', async (req, res) => {
  await get_delete_task_controller().control(req, res);
});

task_router.use((error: Error, req: Request, res: Response) => {
  res.status(500);
  res.json({ message: error.message });
});
