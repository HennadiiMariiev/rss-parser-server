const path = require('path');
const schedule = require('node-schedule');
const { Worker } = require('worker_threads');

const { RSS_NODE_SCHEDULE = '0 */6 * * *' } = require('../../config/config');

const TEMP_SCHEDULE = '*/30 * * * *';
// const TEMP_SCHEDULE = '* * * * *';

const workerFilePath = path.resolve(__dirname, 'schedule.worker.js');

const loadRssPosts = schedule.scheduleJob(TEMP_SCHEDULE, () => {
  try {
    const worker = new Worker(workerFilePath);
    worker.on('message', console.log);
    worker.on('error', console.log);
  } catch (error) {
    console.log('loadRssPosts: ', error);
  }
});

module.exports = { loadRssPosts };
