const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./models/database');
const User = require('./models/user');
const userroutes= require('./routes/user')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // to parse JSON requests

app.use(userroutes);



sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log('Error syncing database:', err);
  });
