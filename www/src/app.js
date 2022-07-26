const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { corsOptions } = require('./config/options');
const { postsRouter } = require('./routes/posts.routes');
const { adminRouter } = require('./routes/admin.routes');
const { creatorsRouter } = require('./routes/creators.routes');
const { categoriesRouter } = require('./routes/categories.routes');
const ScheduleService = require('./services/schedule.service');

try {
  ScheduleService.loadRssPosts;
} catch (error) {
  console.log('ScheduleService.loadRssPosts', error);
}

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/auth', adminRouter);
app.use('/api/creators', creatorsRouter);
app.use('/api/categories', categoriesRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});
app.use((err, _, res, next) => {
  const { status: code = 500, message = 'Internal server error' } = err;
  res.status(code).json({ message, status: 'error', code });
});

module.exports = { app };
