const express = require('express');

const router = express.Router();
router.get('/register', (rea, res) => {
  res.send('register');
});

router.get('/login', (req, res) => {
  res.render('./users/login');
});

module.exports = router;