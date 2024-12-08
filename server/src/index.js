import express from 'express';
import expressInit from './config/expressInit.js';
import mongooseInit from './config/mongooseInit.js';

import routes from './routes.js';

const app = express();

mongooseInit();
expressInit(app);

app.use('/api', routes);

app.listen(3000, () => console.log(`Server running on http://localhost:3000`));