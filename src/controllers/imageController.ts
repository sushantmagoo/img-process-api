import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import imageProcessor from '../utils/imageProcessor';
import { setCache } from '../middlewares/cache';

export default {
  /**
   * @description Image Controller
   */
  async process(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    const oldFilePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'images',
      'original'
    );
    const newFilePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'images',
      'thumbnail'
    );
    const fileName = req.query.filename + '.jpg';
    const height: number = parseInt(req.query.height as string);
    const width: number = parseInt(req.query.width as string);

    // !NOTE: Some validation
    if (!fileName || !height || !width) {
      return res.status(422).send({ message: 'invalid request body' });
    }

    console.log(
      'Filename: ' + fileName + ', Height: ' + height + ', Width: ' + width
    );

    // !NOTE: Checks file existence
    try {
      await fs.access(`${oldFilePath}/${fileName}`);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: 'error accessing file' });
    }

    let resizedImage: Buffer;

    // !NOTE: Processes the image
    try {
      resizedImage = await imageProcessor(
        `${oldFilePath}/${fileName}`,
        height,
        width
      );
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: 'failed to process image' });
    }

    console.log('successfully processed image');

    // !NOTE: Saves the image
    try {
      await fs.writeFile(
        `${newFilePath}/${height}_${width}_${fileName}`,
        resizedImage
      );
    } catch (e) {
      console.log(e);
      return res.status(500).send({ message: 'internal server error' });
    }

    console.log('successfully saved image');

    // !NOTE: Caches the Buffer
    setCache(
      req.query.filename + '_' + req.query.height + '_' + req.query.width,
      resizedImage
    );

    console.log('successfully added cache');

    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    return res.end(resizedImage);
  },
};
