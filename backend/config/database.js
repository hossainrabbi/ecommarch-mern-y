const mongoose = require('mongoose');

async function connectionWithMongoose() {
  try {
    const data = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Database Connection Successfully! host: ${data.connections[0].host} and port: ${data.connections[0].port}`
    );
  } catch (err) {
    console.log(`Database Connection Fail! ${err.message}`);
  }
}

module.exports = connectionWithMongoose;
