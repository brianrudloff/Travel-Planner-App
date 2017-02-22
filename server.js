const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
var bodyParser = require('body-parser');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://brianrudloff:ilovetesting@localhost:5432/travelplanner');

app.use(bodyParser.urlencoded({ extended: true }));

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

app.use(express.static(path.join(__dirname, './node_modules/')));
app.use(express.static(path.join(__dirname, './client/')));

var Plan = sequelize.define('plan', {
  plan: Sequelize.STRING,
});

app.post('/save',function (req, res) {

  Plan.sync().then(function () {
    Plan.create({
      plan: req.body.message,
    }).then((data) => {
      if (data) {
        console.log(data);
      } else {
        console.log('Error!', err);
      }
    });
  });
});

app.get('/save', function(req, res) {
  console.log('get in server');
  return Plan.findAll({})
    .then ((data) => {
      (res.send(data));
    });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});





