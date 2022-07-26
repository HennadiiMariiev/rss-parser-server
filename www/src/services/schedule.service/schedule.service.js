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
    worker.on('message', (msg) => console.log(msg));
    worker.on('error', (err) => console.log(err));
  } catch (error) {
    console.log('loadRssPosts: ', error);
  }
});

module.exports = { loadRssPosts };
