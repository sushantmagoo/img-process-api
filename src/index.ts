import express from 'express';
import image from './routes/imageRoute';

const app = express();
const port = 3000;

app.use('/api', image);

app.listen(port, () => console.log('listening on port: ' + port));

export default app;
