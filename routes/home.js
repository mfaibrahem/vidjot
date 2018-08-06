const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const title = 'welcome';
  res.render('index', {
    title
  });
});

module.exports = router;