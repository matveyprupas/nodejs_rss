const express = require('express');
const fs = require('fs');

const app = express();
const jsonParser = express.json();

const port = 8080;

app.use(express.static('public'));

const filePath = 'hw2/hw2_1/users.json';

app.get('/api/users', (req, res) => {
  if (!req.query.name || !req.query.limit) return res.status(404).end('Oops... We need parameters NAME and LIMIT');

  const contentJSON = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(contentJSON);
  const resultArr = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key in users) {
    if ({}.hasOwnProperty.call(users, key)) {
      const login = users[key].login.toLowerCase();
      const searchLogin = req.query.name.toLowerCase();
      const maxArrLength = req.query.limit;

      if (resultArr.length >= maxArrLength) break;

      if (login.includes(searchLogin)) {
        resultArr.push(users[key]);
      }
    }
  }

  return res.status(200).send(resultArr);
});

app.get('/api/users/:id', (req, res) => {
  const myId = req.params.id;
  const content = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(content);
  let user;

  // eslint-disable-next-line no-restricted-syntax
  for (const key in users) {
    if (users[key].id === myId) {
      user = (users[key]);
      break;
    }
  }
  if (user) {
    res
      .status(200)
      .send(user);
  } else {
    res
      .status(404)
      .end('Oops... User is absent');
  }
});

app.post('/api/users/', jsonParser, (req, res) => {
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

app.put('/api/users/', jsonParser, (req, res) => {
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

app.delete('/api/users/:id', (req, res) => {
  const userID = req.params.id;

  let dataJSON = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(dataJSON);
  const deletingUser = users[userID];

  if (!deletingUser) return res.status(404).end("Oops... I cannot DELETE user with this ID. I couldn't find him");

  deletingUser.isDeleted = true;

  dataJSON = JSON.stringify({ ...users, [userID]: deletingUser });
  fs.writeFileSync(filePath, dataJSON);

  return res.status(200).send(JSON.parse(dataJSON));
});

app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
});
