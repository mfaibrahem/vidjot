const express = require('express');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const home = require('./routes/home');
const about = require('./routes/about');
const ideas = require('./routes/ideas');
const users = require('./routes/users');
const app = express();

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/vidjot-dev', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err.message));


// static folders and files path in express using middleware

// app.use(express.static('./public'));
app.use('/static', express.static(path.join(__dirname, './public')));

// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body-parser midlleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// method override middleware
app.use(methodOverride('_method'));

// router handler middlewares
app.use('/', home);
app.use('/about', about);
app.use('/', ideas);
app.use('/users', users);


const port = 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});