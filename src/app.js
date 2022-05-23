import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import * as url from 'url';

import init from './routes/index.js';

const app = express();
app.use(json());
app.use(cors());
app.use(morgan('dev'));
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

init(app);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
