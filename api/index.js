const express = require('express');
const cors = require('cors');
const app = express();
//const bodyParser = require('body-Parser');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

var corsOptions = {
  //origin: ["http://localhost:4200","http://0.0.0.0:4200"]
  origin: '*'
};
app.use(cors(corsOptions));

// Middleware
const {trimmer,showuri} = require('./middleware/utility');
app.use(trimmer);
app.use(showuri);

const ldapv1 = require('./route/ldapv1.route');
app.use('/api/v1/ldap',ldapv1);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});