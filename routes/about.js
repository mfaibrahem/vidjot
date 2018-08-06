const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const about = 'About';
  res.render('about', {
    about
  });
});

module.exports = router;