import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets image processing api endpoint on an existing image', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&height=300&width=300'
    );
    expect(response.status).toBe(200);
  });
});
