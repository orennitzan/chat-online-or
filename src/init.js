const dotenv = require("dotenv"); // eslint-disable-line global-require

const result = dotenv.config();
if (result.error) {
  throw result.error.message;
}
