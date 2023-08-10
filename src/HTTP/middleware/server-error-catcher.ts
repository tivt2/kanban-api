import { NextFunction, Request, Response } from 'express';

export function server_error_catcher_middleware(router: string) {
  return async function (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    console.log(`Error in ${router}: `, error);
    res.status(500);
    res.json({
      message: 'Something wrong happend, please try again in a moment',
    });
  };
}
