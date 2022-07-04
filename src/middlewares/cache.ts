import express from 'express';

interface Cache {
  [key: string]: Buffer;
}

const cachedRoutes: Cache = {};

/**
 * @description Gets Image Cache
 * @key Combination of `filename_height_width`
 * @value Image Buffer
 */
export function getCache(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const key: string =
    req.query.filename + '_' + req.query.height + '_' + req.query.width;

  if (cachedRoutes[key]) {
    console.log('---');
    console.log('SERVING VIA CACHE');
    console.log(cachedRoutes);
    console.log('---');

    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    return res.end(cachedRoutes[key]);
  } else {
    console.log('---');
    console.log('NOT SERVING VIA CACHE');
    // console.log(cachedRoutes);
    console.log('---');

    return next();
  }
}

/**
 * @description Sets Image Cache
 * @key Combination of `filename_height_width`
 * @value Image Buffer
 */
export function setCache(key: string, value: Buffer): void {
  cachedRoutes[key] = value;
}
