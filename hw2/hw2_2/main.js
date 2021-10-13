const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const express = require('express');
const fs = require('fs');

const app = express();
const jsonParser = express.json();

const port = 8080;

app.use(express.static('public'));

const filePath = 'hw2/hw2_2/users.json';

const querySchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{2,}$')).required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean().required(),
});

app.post('/api/users/', jsonParser, validator.body(querySchema), (req, res) => {
  if (!req.body) return res.status(404).end('Oops...');

  const userID = req.body.id;
  const userLogin = req.body.login;
  const userPassword = req.body.password;
  const userAge = req.body.age;
  const isUserDeleted = req.body.isDeleted;

  const user = {
    id: userID, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted,
  };

  let dataJSON = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(dataJSON);

  if (users[userID]) return res.status(404).end('Oops... User with this ID already exist');

  dataJSON = JSON.stringify({ ...users, [userID]: user });
  fs.writeFileSync(filePath, dataJSON);

  return res.status(200).send(JSON.parse(dataJSON));
});

app.put('/api/users/', jsonParser, validator.body(querySchema), (req, res) => {
  if (!req.body) return res.status(404).end('Oops...');

  const userID = req.body.id;
  const userLogin = req.body.login;
  const userPassword = req.body.password;
  const userAge = req.body.age;
  const isUserDeleted = req.body.isDeleted;

  const user = {
    id: userID, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted,
  };

  let dataJSON = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(dataJSON);

  if (!users[userID]) return res.status(404).end("Oops... User with this ID didn't find");

  dataJSON = JSON.stringify({ ...users, [userID]: user });
  fs.writeFileSync(filePath, dataJSON);

  return res.status(200).send(JSON.parse(dataJSON));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
