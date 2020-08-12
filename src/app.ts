import * as express from 'express';
import { handleCollector } from './routes/collector.route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', handleCollector());

export default app;
