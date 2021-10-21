const express = require('express');
const cors = require('cors');
const app = express();
const encryptPassword = require('./encryption');
const db = require('./models');

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  db.user.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user) {
      let encrypted_password = encryptPassword(req.body.password);

      if (user.password == encrypted_password) {
        res.json({ login: true });
      } else {
        res.json({ login: false });
      }
    } else {
      res.json({ login: false })
    }
  })
});

app.post('/api/register', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;

  if (password !== confirm_password) {
    res.json({ error: 'Passwords do not match' });
    return;
  }

  db.user.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      res.json({ error: 'User Already Exists' });
      return;
    }

    db.user.create({
      email: email,
      password: encryptPassword(password)
    }).then((new_user) => {
      console.log(new_user);
      res.json({ error: false });
    })
  });
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`starting app in port ${process.env.PORT || '3001'}`)
})