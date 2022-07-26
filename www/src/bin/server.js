const { app } = require('../app');
const { connectDatabase } = require('../config/db.connect');
const { PORT } = require('../config/config');

const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (e) {
    console.log('Failed to start application with error: ', e.message);
    process.exit(1);
  }
};

start();
