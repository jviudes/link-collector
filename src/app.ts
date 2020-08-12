import * as express from 'express';
import { serve, setup } from 'swagger-ui-express';

import { handleCollector } from './routes/collector.route';
import DOCUMENTATION_JSON from './utils/documentation';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', serve, setup(DOCUMENTATION_JSON));
app.use('/', handleCollector());

export default app;
