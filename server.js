const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

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
  // bcrypt.compare(password, hash, function(err, res){

  // })
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error login');
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // bcrypt.hash(password, null, null, function(err, hash) {
  //   console.log('HHHHHH:', hash);
  // });
  database.users.push({
    id: '3',
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('not found user');
  }
});

app.post('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    req.ststus(404).json('user not found');
  }
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
