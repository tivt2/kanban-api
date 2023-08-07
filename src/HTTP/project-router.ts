import { Request, Response, Router } from 'express';

export const project_router = Router();

project_router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from project' });
});

project_router.use((error: Error, req: Request, res: Response) => {
  res.status(500);
  res.json({ message: error.message });
});
