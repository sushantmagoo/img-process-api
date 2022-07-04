import express from 'express';

export default (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
): void => {
  console.log('---');
  console.log('Route visited: ' + req.url);
  console.log('---');

  return next();
};
