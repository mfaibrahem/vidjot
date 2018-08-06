const express = require('express');
const exphbs = require('express-handlebars');
const home = require('./routes/home');
const about = require('./routes/about');
const app = express();

// static folders and files path in express using middleware
app.use(express.static('./public'));

// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// router handler middlewares
app.use('/', home);
app.use('/about', about);
// index route
// app.get('/', (req, res) => {
//   const title = 'welcome';
//   res.render('index', {
//     title
//   });
// });
// about route
// app.get('/about', (req, res) => {
//   const about = 'About';
//   res.render('about', {
//     about
//   });
// });

const port = 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});