const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
// const routes = require('./routes/index');

const PORT = config.get('port') || 3033;

const app = express();
// app.use();
async function start() {
  try {
    await mongoose.connect(config.get('mongoUrl'),
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
    app.listen(PORT, () => {
      console.log('Server listening on port ' + PORT);
    })
  } catch (err) {
    console.log('Server error: ' + err.message);
    process.exit(1);
  }
}

start();
