const app = require('./src/app');
const { PORT } = require('./src/utils/const.env');

const port = PORT || 8080;

app.listen(port, () => {
  console.log(`App is listening running on port ${port}`);
});
