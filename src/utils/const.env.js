require('dotenv').config();

const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;
const SECRET = process.env.SECRET;

module.exports = {
  PORT,
  SERVER_URL,
  SECRET,
};
