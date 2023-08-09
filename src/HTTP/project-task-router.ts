import { Request, Response, Router } from 'express';
import { get_create_task_controller } from '../features/task/create-task/index.singletons';
import { get_edit_task_controller } from '../features/task/edit-task/index.singletons';
import { get_delete_task_controller } from '../features/task/delete-task/index.singletons';

export const project_task_router = Router();

project_task_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from /:project' });
});

project_task_router.post('/:project_id', async (req, res) => {
  await get_create_task_controller().control(req, res);
});

project_task_router.put('/:project_id/:task_id', async (req, res) => {
  await get_edit_task_controller().control(req, res);
});

project_task_router.delete('/:project_id/:task_id', async (req, res) => {
  await get_delete_task_controller().control(req, res);
});

project_task_router.use((error: Error, req: Request, res: Response) => {
  res.status(500);
  res.json({ message: error.message });
});
