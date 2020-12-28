import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Root Controllers';

const get = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Root health check route called');

  return res.status(200).json({
    message: 'Hello'
  });
};

export default { get };
