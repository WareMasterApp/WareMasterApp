const app = require('./src/app');
const { initDB } = require('./src/database/db');
const { PORT } = require('./src/utils/const.env');

const port = PORT || 8080;

initDB((error) => {
  if (error) {
    console.error(error);
  } else {
    app.listen(port, () => {
      console.log(`App is listening running on port ${port}`);
    });
  }
});
