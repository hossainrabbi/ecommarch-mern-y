const app = require('./app');
const connectionWithMongoose = require('./config/database');

// Database Connection
connectionWithMongoose();

app.listen(process.env.PORT, () => {
  console.log(`App is Listen on http://localhost:${process.env.PORT}`);
});
