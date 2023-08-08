import { Request, Response, Router } from 'express';
import { CreateProjectController } from '../features/project/create-project/create-project.controller';
import { CreateProjectRequest } from '../features/project/create-project/create-project.request';
import { CreateProjectService } from '../features/project/create-project/create-project.service';
import { ProjectRepositorySpy } from '../data/repositories/project/project.repository.spy';
import { RequestValidator } from '../features/shared/request-validator/request-validator.service';

export const project_router = Router();

// project_router.get('/', (req, res) => {
//   res.status(200);
//   res.json({ message: 'Hello from project' });
// });

project_router.get('/', async (req, res) => {
  const sut = new CreateProjectController(
    new CreateProjectRequest(),
    new CreateProjectService(new ProjectRepositorySpy()),
  );
  await sut.control(req, res);
});

project_router.use((error: Error, req: Request, res: Response) => {
  res.status(500);
  res.json({ message: error.message });
});
