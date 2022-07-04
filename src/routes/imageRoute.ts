import express from 'express';
import imageController from '../controllers/imageController';
import { getCache } from '../middlewares/cache';
import logMiddleware from '../middlewares/log';

const routes = express.Router();

/**
 * @description Image Route
 */
routes.get('/images', logMiddleware, getCache, imageController.process);

export default routes;
