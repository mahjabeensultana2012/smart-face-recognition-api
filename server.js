const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const database = {
  users: [
    {
      id: '1',
      name: 'nishi',
      email: 'nishi@yahoo.com',
      password: 'nishi',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '2',
      name: 'nameera',
      email: 'nameera@yahoo.com',
      password: 'nameera',
      entries: 0,
      joined: new Date(),
    },
  ],
};
app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error login');
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: '3',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});
app.listen(3000, () => {
  console.log('app is running on port 3000');
});
