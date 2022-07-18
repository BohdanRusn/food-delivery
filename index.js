const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const router = require('./routes/index')

const app = express();

app.use(express.json({extended: true}));

app.use('/api', router);
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.get('/', (req, res) => {
    res.send('App is running');
  })
}



const PORT = process.env.PORT || 3033;

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
