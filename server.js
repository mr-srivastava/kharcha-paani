const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const groupRouter = require('./routes/group');

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

const app = express();
const port = process.env.PORT || 5000;
const whitelist = process.env.CORS_WHITELIST;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log('**Origin of request' + origin);
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log('Origin accepted');
//       callback(null, true);
//     } else {
//       console.log('Origin rejected');
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
// app.use(cors(corsOptions));

//Listen
app.listen(port, () => console.log(`Listening on Port ${port}`));

//serve react
if (process.env.NODE_ENV === 'production') {
  //Serve any static file
  app.use(express.static(path.join(__dirname, 'client/build')));

  //Handle react route and return all requests to react
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use('/api/group', groupRouter);

// Get Route
app.get('/api', (req, res) => {
  res.send('Server connected to client');
});
