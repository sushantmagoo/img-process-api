import path from 'path';
import supertest from 'supertest';
import app from '../index';
import imageProcessor from '../utils/imageProcessor';

const request = supertest(app);

const filePath = path.join(
  __dirname,
  '..',
  '..',
  'public',
  'images',
  'original',
  'encenadaport.jpg'
);
const height = 600;
const width = 600;

describe('Test endpoint responses and image processor function', () => {
  it('should check image processor func is working as expected', async () => {
    const bufferData: Buffer | null = await imageProcessor(
      filePath,
      height,
      width
    );
    expect(bufferData).not.toBeNull();
  });

  it('should check image processor API is working as expected', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&height=300&width=300'
    );
    expect(response.status).toBe(200);
  });
});
