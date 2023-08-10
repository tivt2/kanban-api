import { Request, Response, Router } from 'express';
import { get_leave_project_controller } from '../features/project/leave-project/index.singletons';
import { get_create_project_controller } from '../features/project/create-project/index.singletons';
import { get_join_project_controller } from '../features/project/join-project/index.singletons';
import { get_edit_project_controller } from '../features/project/edit-project/index.singletons';
import { get_connect_project_controller } from '../features/project/connect-to-project/index.singletons';
import { get_create_task_controller } from '../features/task/create-task/index.singletons';
import { get_delete_task_controller } from '../features/task/delete-task/index.singletons';
import { get_edit_task_controller } from '../features/task/edit-task/index.singletons';

export const project_router = Router();

project_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from project' });
});

// PROJECT ROUTES
project_router.get('/connect/:project_id', async (req, res) => {
  await get_connect_project_controller().control(req, res);
});

project_router.post('/', async (req, res) => {
  await get_create_project_controller().control(req, res);
});

project_router.put('/join/:project_id', async (req, res) => {
  await get_join_project_controller().control(req, res);
});

project_router.put('/leave/:project_id', async (req, res) => {
  await get_leave_project_controller().control(req, res);
});

project_router.put('/:project_id', async (req, res) => {
  await get_edit_project_controller().control(req, res);
});

// PROJECT TASK ROUTES
project_router.post('/:project_id', async (req, res) => {
  await get_create_task_controller().control(req, res);
});

project_router.put('/:project_id/:task_id', async (req, res) => {
  await get_edit_task_controller().control(req, res);
});

project_router.delete('/:project_id/:task_id', async (req, res) => {
  await get_delete_task_controller().control(req, res);
});

project_router.use((error: Error, req: Request, res: Response) => {
  res.status(500);
  res.json({ message: error.message });
});
